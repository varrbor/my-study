# Physical and Logical Network Topologies
- Topology: how the devices in a network are arranged and connected
- Physical topology: how the cables and devices are actually laid out
- Logical topology: how the data actually flows between devices
- The two can differ: a hub network is a physical star but a logical bus

## Physical topologies

| Topology | Layout | Pros | Cons |
|----------|--------|------|------|
| Bus | all devices on one shared cable | cheap, little cable | one break stops everything, collisions, obsolete |
| Ring | each device linked to two neighbours in a loop | predictable, no collisions | one failure breaks the ring (unless dual ring) |
| Star | every device linked to a central switch | easy to manage, one cable failure affects one device | central device is a single point of failure |
| Extended star (tree) | stars joined through a hierarchy of switches | scales well, the usual LAN design | upper-level failure cuts off a whole branch |
| Mesh | devices linked to many or all others | redundant paths, very resilient | expensive, lots of cabling and ports |
| Hybrid | mix of the above | fits real needs | more complex |
| Point-to-point | one direct link between two devices | simple, dedicated | only two endpoints |

## Mesh details
- Full mesh: every node linked to every other, n(n-1)/2 links (10 nodes = 45 links)
- Partial mesh: only the important nodes have several links
- Common in WAN cores, data centers and wireless mesh networks

## Logical topologies
- Bus (broadcast): every device sees every frame, e.g. hub-based Ethernet, Wi-Fi channel
- Ring (token passing): a device sends only when it holds the token, e.g. Token Ring, FDDI
- Switched (point-to-point): the switch forwards a frame only to its destination port, modern Ethernet
- VLANs: split one physical network into several logical ones

## WAN topologies
- Hub-and-spoke: branch offices connect to one central site, cheap but the hub is a single point of failure
- Full or partial mesh: sites connect directly to each other, more resilient and more expensive

## In practice
- LANs: physical extended star, logically switched
- Redundant links between switches create loops, handled by spanning tree (STP)
- Choice is a trade-off between cost, redundancy and ease of management

https://en.wikipedia.org/wiki/Network_topology
