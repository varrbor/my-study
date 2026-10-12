# Switches, ARP and Wireshark
- Switch: layer 2 device that forwards Ethernet frames by MAC address
- ARP: finds the MAC address that belongs to an IPv4 address on the local network
- Wireshark: a packet analyzer that lets you watch both of them at work

## How a switch works
- Each device has a MAC address: 48 bits, written as 00:1A:2B:3C:4D:5E, the first half identifies the vendor (OUI)
- The switch keeps a MAC address table (CAM table): MAC address → port

| Action | What the switch does |
|--------|----------------------|
| Learn | reads the source MAC of every incoming frame and records it against the port |
| Forward | destination MAC is in the table: sends the frame out of that one port |
| Flood | destination MAC is unknown, broadcast or multicast: sends it out of all ports except the incoming one |
| Filter | destination is on the same port the frame came in on: drops it |
| Age out | removes entries not seen for a while (default about 5 minutes) |

- Broadcast address: FF:FF:FF:FF:FF:FF, delivered to every device in the VLAN

## Switch vs hub
- Hub (layer 1): repeats everything to all ports, one collision domain, half duplex
- Switch (layer 2): sends a frame only where it needs to go, each port is its own collision domain, full duplex
- A switch is still one broadcast domain (per VLAN); only a router or VLAN splits it

## Switch features
- Unmanaged: plug and play, no configuration
- Managed: VLANs, port security, monitoring, spanning tree, remote management
- VLAN: splits one switch into separate logical networks
- Trunk port: carries several VLANs between switches, tagged with 802.1Q
- STP (spanning tree): blocks redundant links to prevent loops and broadcast storms
- PoE: powers phones, cameras and access points over the data cable
- Layer 3 switch: can also route between VLANs

## ARP (Address Resolution Protocol)
- IP packets travel inside Ethernet frames, and a frame needs a destination MAC address
- A host knows the destination IP but not its MAC, so it asks with ARP
- Works only inside the local network (broadcasts do not cross routers)

## ARP process
1. Host A (192.168.1.10) wants to send to 192.168.1.20 and checks its ARP cache: no entry
2. A broadcasts an ARP request: "Who has 192.168.1.20? Tell 192.168.1.10"
3. The switch floods the broadcast to every port
4. Host B recognises its IP and sends a unicast ARP reply: "192.168.1.20 is at 00:1A:2B:3C:4D:5E"
5. A stores the mapping in its ARP cache and sends the frame
6. The switch has learned both MAC addresses along the way

## Same network or a different one
- Destination on the same subnet: ARP for the destination's own MAC
- Destination on another subnet: ARP for the default gateway's MAC, and send the frame to the router
- The IP addresses stay the same end to end; the MAC addresses change at every router hop

## ARP commands

| Command | Does |
|---------|------|
| `arp -a` | shows the ARP cache (Windows, Linux, macOS) |
| `arp -d *` | clears the cache (Windows, as administrator) |
| `ip neigh` | shows the cache on modern Linux |
| `show mac address-table` | shows the switch's MAC table (Cisco) |
| `show arp` | shows the ARP table on a Cisco device |

- Dynamic entries are learned and expire; static entries are set by hand

## ARP variations and risks
- Gratuitous ARP: a host announces its own mapping unasked, used to detect duplicate IPs and after failover
- Proxy ARP: a router answers ARP on behalf of a host on another network
- ARP has no authentication: any device can claim any IP
- ARP spoofing (poisoning): an attacker sends fake replies to place itself between a victim and the gateway (man in the middle)
- MAC flooding: filling the switch table with fake addresses so it floods everything like a hub
- Defences: dynamic ARP inspection, DHCP snooping, port security, encrypted protocols
- IPv6 has no ARP; it uses Neighbor Discovery (NDP) over ICMPv6

## Wireshark
- Free packet analyzer: captures the frames a network interface sees and decodes every layer
- Uses: troubleshooting, learning protocols, security analysis
- Capture only on networks you own or are authorized to monitor

## Using Wireshark
1. Choose the interface (Ethernet or Wi-Fi) and start the capture
2. Generate the traffic you want to see, e.g. `ping` a host
3. Stop the capture and apply a display filter
4. Click a packet to inspect it

- Three panes: packet list, packet details (layer by layer), raw bytes
- The details pane mirrors the OSI layers: Frame, Ethernet II, IP, TCP/UDP, application

## Display filters

| Filter | Shows |
|--------|-------|
| `arp` | ARP only |
| `icmp` | ping traffic |
| `dns` | DNS queries and answers |
| `ip.addr == 192.168.1.10` | traffic to or from an address |
| `ip.src == 192.168.1.10` | traffic from an address |
| `eth.addr == 00:1a:2b:3c:4d:5e` | traffic to or from a MAC address |
| `tcp.port == 443` | traffic on a port |
| `tcp.flags.syn == 1` | TCP connection attempts |
| `http` | unencrypted web traffic |
| `arp or icmp` | combine with `and`, `or`, `not` |

- Capture filter (set before capturing, different syntax): `host 192.168.1.10`, `port 53`
- Follow → TCP Stream: shows one whole conversation

## Seeing ARP in Wireshark
1. Clear the cache: `arp -d *`
2. Start a capture with the filter `arp or icmp`
3. `ping` another device on the LAN
4. Request: Ethernet destination ff:ff:ff:ff:ff:ff, "Who has 192.168.1.20? Tell 192.168.1.10"
5. Reply: unicast, "192.168.1.20 is at 00:1a:2b:3c:4d:5e"
6. Only then do the ICMP echo request and reply appear

## What you can and cannot capture
- On a switch you see only your own traffic plus broadcasts and multicasts
- To see other devices' traffic: a mirror (SPAN) port on the switch, or a network tap
- On Wi-Fi, other clients' traffic needs monitor mode and is encrypted
- HTTPS and other TLS traffic is visible as packets but the content is encrypted

https://en.wikipedia.org/wiki/Address_Resolution_Protocol

https://www.wireshark.org/docs/wsug_html_chunked/
