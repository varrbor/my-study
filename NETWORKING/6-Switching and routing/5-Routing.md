# Routing
- Routing: forwarding packets between different networks, at layer 3, by destination IP address
- Router: connects networks and chooses the next hop for each packet from its routing table
- Switching moves frames inside one network by MAC address; routing moves packets between networks by IP address

## Router vs switch

| | Switch | Router |
|---|--------|--------|
| OSI layer | 2 | 3 |
| Address used | MAC | IP |
| Unit | frame | packet |
| Connects | devices in one network | different networks |
| Table | MAC address table | routing table |
| Broadcasts | forwarded to all ports in the VLAN | not forwarded, each interface is its own broadcast domain |

## What a host does first
- Compares the destination with its own IP and subnet mask
- Same subnet: sends directly (ARP for the destination's MAC)
- Different subnet: sends to the default gateway (ARP for the router's MAC)
- A host with a wrong or missing gateway reaches its own subnet only

## What a router does with a packet
1. Receives the frame, checks it, and removes the layer 2 header
2. Looks up the destination IP in the routing table
3. Picks the best matching route; no match and no default route: drops the packet and returns ICMP "destination unreachable"
4. Decreases the TTL by 1; at 0 the packet is dropped (ICMP "time exceeded")
5. Builds a new frame with its own MAC as source and the next hop's MAC as destination
6. Sends it out of the chosen interface

- IP addresses stay the same along the whole path (unless NAT is applied); MAC addresses change at every hop
- Each router decides independently, hop by hop; the return path may be different

## Routing table
- Each entry: destination network, prefix length, next hop or exit interface, how the route was learned, metric

```
C    192.168.1.0/24 is directly connected, GigabitEthernet0/0
S    10.10.0.0/16 [1/0] via 192.168.1.254
O    172.16.5.0/24 [110/20] via 10.0.0.2, GigabitEthernet0/1
S*   0.0.0.0/0 [1/0] via 203.0.113.1
```

| Code | Source |
|------|--------|
| C | directly connected network |
| L | the router's own interface address |
| S | static route |
| S* | static default route |
| O | OSPF |
| D | EIGRP |
| R | RIP |
| B | BGP |

- `[110/20]` = [administrative distance / metric]

## How the best route is chosen
1. Longest prefix match: the most specific route wins (/24 beats /16 beats /0)
2. Same prefix from several sources: lowest administrative distance wins
3. Same source: lowest metric wins
4. Still equal: traffic is shared across the paths (equal-cost load balancing)

## Administrative distance (Cisco defaults)

| Source | Distance |
|--------|----------|
| Connected | 0 |
| Static | 1 |
| eBGP | 20 |
| EIGRP | 90 |
| OSPF | 110 |
| RIP | 120 |
| iBGP | 200 |

- Lower = more trusted

## Default route
- 0.0.0.0/0 (IPv6 ::/0): matches everything, used when nothing more specific matches
- "Gateway of last resort", normally points to the ISP
- On a host this is the default gateway

## Static vs dynamic routing

| | Static | Dynamic |
|---|--------|---------|
| Configured | by hand, route by route | routers exchange routes with a protocol |
| Reacts to failures | no | yes, recalculates automatically |
| Overhead | none | CPU, memory, bandwidth |
| Scales | poorly | well |
| Use | small networks, default routes, stub sites | medium and large networks |

## Dynamic routing protocols

| Protocol | Type | Metric | Use |
|----------|------|--------|-----|
| RIP | distance vector | hop count (max 15) | old, small networks, lab use |
| EIGRP | advanced distance vector | bandwidth and delay | Cisco networks |
| OSPF | link state | cost (from bandwidth) | the standard inside organizations |
| IS-IS | link state | cost | ISP backbones |
| BGP | path vector | AS path and policies | between organizations; runs the internet |

- IGP (interior): inside one organization (RIP, EIGRP, OSPF, IS-IS)
- EGP (exterior): between autonomous systems (BGP)
- Autonomous system (AS): a network under one administration, identified by an AS number
- Distance vector: each router tells its neighbours its whole table; simple, slow to converge
- Link state: each router learns the full map and computes shortest paths (Dijkstra); fast convergence
- Convergence: the time until all routers agree after a change

## Basic Cisco configuration
```
! interface address
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown

! static route: network, mask, next hop
ip route 10.10.0.0 255.255.0.0 192.168.1.254

! default route
ip route 0.0.0.0 0.0.0.0 203.0.113.1

! OSPF
router ospf 1
 network 192.168.1.0 0.0.0.255 area 0
```

## Commands

| Task | Command |
|------|---------|
| Routing table (Cisco) | `show ip route` |
| Interfaces summary (Cisco) | `show ip interface brief` |
| Routing table (Windows) | `route print` |
| Routing table (Linux) | `ip route` |
| Add a route (Windows) | `route add 10.10.0.0 mask 255.255.0.0 192.168.1.254` |
| Add a route (Linux) | `ip route add 10.10.0.0/16 via 192.168.1.254` |
| Follow the path | `tracert` / `traceroute` |

## Other things routers do
- NAT/PAT between private and public addresses
- Inter-VLAN routing (router-on-a-stick, or a layer 3 switch)
- Packet filtering with ACLs, firewall functions
- DHCP server or DHCP relay
- VPN endpoints, QoS
- First-hop redundancy (HSRP, VRRP): two routers share one virtual gateway address

## Common problems
- Wrong or missing default gateway on the host
- Wrong subnet mask: the host misjudges what is local
- Missing route, or no route back: traffic goes out and the reply never returns
- Routing loop: packets circle until the TTL expires, `tracert` shows the same hops repeating
- Asymmetric routing: different paths out and back, broken by stateful firewalls
- Interface down, or an ACL blocking the traffic
- Method: `ping` the gateway, then `tracert` to see where the path stops, then check the routing table on that router

https://en.wikipedia.org/wiki/Routing

https://en.wikipedia.org/wiki/Routing_table
