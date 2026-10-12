# Network Devices vs OSI Layers
- A device "works at layer N" when N is the highest layer header it reads to make its decision
- Higher layer = smarter decisions, more processing per packet

## Layer 1 (Physical): bits
- Hub: repeats every signal out of all ports, one collision domain, obsolete
- Repeater: regenerates a signal to extend distance
- Also: cables, transceivers, media converters

## Layer 2 (Data Link): frames, MAC addresses
- Switch: learns MAC addresses per port (MAC table), forwards a frame only to the right port
- Bridge: older two-port version of a switch
- Wireless access point: bridges Wi-Fi clients onto the wired LAN
- NIC: has the MAC address, works at layers 1 and 2
- Each switch port is its own collision domain; the whole switch (VLAN) is one broadcast domain

## Layer 3 (Network): packets, IP addresses
- Router: connects different networks, picks the next hop from its routing table
- Layer 3 switch: switch that can also route between VLANs
- Each router interface is a separate broadcast domain

## Layer 4 (Transport): segments, ports
- Firewall (stateful): filters by IP, port and connection state
- Layer 4 load balancer: distributes TCP/UDP connections
- NAT/PAT device: rewrites IP addresses and ports

## Layer 7 (Application): data
- Next-generation firewall, WAF: inspect application content
- Proxy, layer 7 load balancer: route by URL, host or header
- Hosts: PCs and servers implement all 7 layers

## Rule of thumb
- hub = layer 1, switch = layer 2, router = layer 3, firewall = layer 4+

https://en.wikipedia.org/wiki/Networking_hardware
