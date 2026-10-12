# NAT
- NAT (Network Address Translation): a router rewrites the IP addresses in packets as they pass through it
- Main use: let many devices with private addresses share one public address
- Created to slow down IPv4 address exhaustion

## Why it is needed
- Private addresses (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are not routed on the internet
- There are not enough public IPv4 addresses for every device
- The NAT router at the network edge translates between the two

## Types of NAT

| Type | Mapping | Use |
|------|---------|-----|
| Static NAT | one private ↔ one fixed public | servers that must be reachable from outside |
| Dynamic NAT | one private ↔ one public taken from a pool | rare; the pool can run out |
| PAT (NAT overload) | many private ↔ one public, told apart by port | home and office internet access |

- PAT (Port Address Translation) is what people usually mean by "NAT"

## How PAT works
1. Host 192.168.1.10 sends a packet from source port 50000 to a web server
2. The router replaces the source with its public address and a free port: 203.0.113.5:40001
3. The router records the mapping in its NAT translation table
4. The server replies to 203.0.113.5:40001
5. The router looks up the table and forwards the reply to 192.168.1.10:50000

| Inside (private) | Outside (public) | Destination |
|------------------|------------------|-------------|
| 192.168.1.10:50000 | 203.0.113.5:40001 | 198.51.100.7:443 |
| 192.168.1.11:50000 | 203.0.113.5:40002 | 198.51.100.7:443 |

- One public address can carry tens of thousands of connections (about 65,000 ports)
- Entries are removed when the connection closes or times out

## Cisco terminology
- Inside local: the host's private address, as seen inside
- Inside global: the host's public address after translation
- Outside global: the real address of the remote host

## Port forwarding (destination NAT)
- Inbound connections have no table entry, so the router drops them by default
- Port forwarding: a fixed rule sending a public port to an inside host, e.g. public :443 → 192.168.1.20:443
- Source NAT (SNAT) changes the source on the way out; destination NAT (DNAT) changes the destination on the way in

## Pros and cons
- Pros: saves public addresses, hides the internal addressing, lets you change ISP without renumbering
- Cons: breaks true end-to-end connectivity, inbound connections need extra setup
- Cons: troubles protocols that carry IP addresses in their data (FTP, SIP, IPsec), needing helpers or NAT traversal (STUN, TURN)
- Cons: adds processing and makes tracing harder
- NAT is not a firewall: it hides addresses but does not inspect traffic

## Related
- CGNAT (carrier-grade NAT): the ISP applies NAT again, using the 100.64.0.0/10 range, so customers share public addresses
- NAT64: lets IPv6-only clients reach IPv4 servers
- IPv6 has enough addresses that NAT is not needed

https://en.wikipedia.org/wiki/Network_address_translation
