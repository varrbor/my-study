# Managed Switches, VLANs and Trunks
- Managed switch: a switch you can log in to and configure
- VLAN: a logical network that splits one physical switch into several separate LANs
- Trunk: a link that carries several VLANs between switches

## Unmanaged vs managed switches

| | Unmanaged | Managed |
|---|-----------|---------|
| Configuration | none, plug and play | CLI, web interface, SNMP |
| VLANs | no | yes |
| Monitoring | link lights only | port statistics, logs, SNMP, port mirroring |
| Redundancy | no loop protection | spanning tree, link aggregation |
| Security | none | port security, 802.1X, ACLs |
| Price | low | higher |
| Use | home, small office | business networks |

- Smart (web-managed) switch: in between, a limited feature set through a web page
- A managed switch has a management IP address so it can be reached over the network (SSH, HTTPS)

## Managed switch features
- VLANs and trunking
- STP (spanning tree): prevents layer 2 loops
- Link aggregation (LACP / EtherChannel): bundles several links into one for speed and redundancy
- Port security: limits which or how many MAC addresses may use a port
- Port mirroring (SPAN): copies a port's traffic to another port for Wireshark
- QoS: prioritizes traffic such as voice
- PoE, 802.1X authentication, DHCP snooping, SNMP monitoring

## VLAN (Virtual LAN)
- Groups ports into separate layer 2 networks regardless of physical location
- Each VLAN is its own broadcast domain and normally its own IP subnet
- Devices in different VLANs cannot talk to each other without a router
- Identified by a VLAN ID: 1–4094

## Why use VLANs
- Security: separate staff, guests, servers, IoT, management
- Smaller broadcast domains, less broadcast traffic
- Flexibility: move a user to another network by changing a port setting, not the cabling
- Fewer switches: one switch serves several networks
- Easier policies: firewall and QoS rules per VLAN

## Typical VLAN plan

| VLAN | Name | Subnet |
|------|------|--------|
| 10 | Staff | 192.168.10.0/24 |
| 20 | Servers | 192.168.20.0/24 |
| 30 | Voice | 192.168.30.0/24 |
| 40 | Guest | 192.168.40.0/24 |
| 99 | Management | 192.168.99.0/24 |

## Port types

| | Access port | Trunk port |
|---|-------------|------------|
| VLANs carried | one | many |
| Frames | untagged | tagged with the VLAN ID (802.1Q) |
| Connects to | end devices: PC, printer, camera | switches, routers, access points, hypervisors |

- Access port: the device does not know it is in a VLAN; the switch adds and removes the tag
- Voice VLAN: an access port that also carries a second, tagged VLAN for an IP phone

## Trunks and 802.1Q
- Without a trunk you would need one cable per VLAN between two switches
- 802.1Q inserts a 4-byte tag into the Ethernet frame, holding the 12-bit VLAN ID and a 3-bit priority
- The receiving switch reads the tag, so it knows which VLAN the frame belongs to
- Native VLAN: the one VLAN sent untagged on a trunk (VLAN 1 by default); it must match on both ends
- Allowed VLAN list: restricts which VLANs a trunk carries
- ISL: Cisco's old trunking protocol, replaced by 802.1Q

## How a frame travels
1. PC in VLAN 10 sends a normal untagged frame to its access port
2. The switch assigns the frame to VLAN 10
3. Out of the trunk, the frame leaves tagged with VLAN 10
4. The second switch reads the tag and forwards only to VLAN 10 ports
5. Out of an access port, the tag is removed before the frame reaches the destination PC

## Inter-VLAN routing
- VLANs are separate networks, so traffic between them must be routed at layer 3

| Method | How |
|--------|-----|
| Router with one interface per VLAN | simple, wastes ports, does not scale |
| Router-on-a-stick | one trunk to the router, a sub-interface per VLAN |
| Layer 3 switch (SVI) | a virtual interface per VLAN on the switch itself; fastest, the usual choice |

- The router or SVI address is the default gateway for that VLAN
- Firewall rules or ACLs between VLANs decide what may cross

## Basic Cisco configuration
```
! create VLANs
vlan 10
 name Staff
vlan 20
 name Servers

! access port
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10

! trunk port
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk native vlan 99
 switchport trunk allowed vlan 10,20,99

! management address
interface vlan 99
 ip address 192.168.99.2 255.255.255.0
```

| Command | Shows |
|---------|-------|
| `show vlan brief` | VLANs and their access ports |
| `show interfaces trunk` | trunk ports, native and allowed VLANs |
| `show interfaces status` | port state, VLAN, speed, duplex |
| `show mac address-table` | MAC addresses per port and VLAN |
| `show running-config` | the current configuration |

## Best practices
- Do not use VLAN 1 for user traffic or management
- Put management in its own VLAN
- Set the native VLAN to an unused VLAN, the same on both ends
- Allow only the needed VLANs on each trunk
- Configure ports explicitly as access or trunk; disable automatic negotiation (DTP)
- Shut down unused ports and place them in an unused VLAN
- These steps also defend against VLAN hopping (switch spoofing and double tagging)

## Common problems
- Port in the wrong VLAN: the device gets the wrong IP range or none
- VLAN missing on one switch, or not allowed on the trunk: works on one switch, fails across two
- Native VLAN mismatch: traffic leaks between VLANs, warnings in the logs
- One side trunk, the other access: only one VLAN works
- No inter-VLAN routing or a wrong default gateway: hosts reach their own VLAN only

https://en.wikipedia.org/wiki/VLAN

https://en.wikipedia.org/wiki/IEEE_802.1Q
