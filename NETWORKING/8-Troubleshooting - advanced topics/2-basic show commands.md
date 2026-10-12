# Basic Show Commands
- `show` commands display the configuration and current state of a network device (Cisco IOS syntax here)
- They only read information and change nothing, so they are safe to run
- Troubleshooting on a switch or router starts with them

## CLI modes

| Prompt | Mode | How to enter |
|--------|------|--------------|
| `Switch>` | user EXEC, limited commands | log in |
| `Switch#` | privileged EXEC, all `show` commands | `enable` |
| `Switch(config)#` | global configuration | `configure terminal` |
| `Switch(config-if)#` | interface configuration | `interface Gi0/1` |

- Run `show` commands from privileged EXEC
- From a configuration mode, prefix with `do`: `do show ip interface brief`

## Device and configuration

| Command | Shows |
|---------|-------|
| `show version` | model, IOS version, uptime, serial number, memory, reason for the last reload |
| `show running-config` | the active configuration, in RAM |
| `show startup-config` | the saved configuration, in NVRAM, loaded at boot |
| `show inventory` | hardware modules and serial numbers |
| `show flash:` | files in flash, including the IOS image |
| `show clock` | date and time |
| `show users` | who is logged in |
| `show history` | recently typed commands |
| `show logging` | system log messages |
| `show processes cpu` | CPU load |
| `show environment` | temperature, fans, power |

- Running and startup configurations differ until you save: `copy running-config startup-config`

## Interfaces

| Command | Shows |
|---------|-------|
| `show ip interface brief` | every interface with its IP address and status, on one line each |
| `show interfaces` | full detail: status, speed, duplex, traffic and error counters |
| `show interfaces Gi0/1` | the same for one interface |
| `show interfaces status` | switch ports: state, VLAN, duplex, speed, type |
| `show interfaces description` | status with the configured descriptions |
| `show interfaces trunk` | trunk ports, native and allowed VLANs |
| `show ip interface Gi0/1` | layer 3 details, including applied ACLs |

## Interface status

| Status / Protocol | Meaning |
|-------------------|---------|
| up / up | working |
| up / down | layer 2 problem: encapsulation mismatch, no keepalives |
| down / down | layer 1 problem: no cable, the other end is off, speed mismatch |
| administratively down / down | shut down in the configuration; fix with `no shutdown` |
| err-disabled (switch port) | the switch disabled the port after a violation, e.g. port security |

## Counters in `show interfaces`
- Input / output rate: current traffic
- CRC and input errors: bad cable, interference, duplex mismatch
- Collisions and late collisions: duplex mismatch
- Runts and giants: undersized and oversized frames
- Output drops: congestion
- `clear counters` resets them, so you can see whether errors are still growing

## Switching (layer 2)

| Command | Shows |
|---------|-------|
| `show vlan brief` | VLANs and the access ports in each |
| `show mac address-table` | learned MAC addresses with their VLAN and port |
| `show mac address-table address 001a.2b3c.4d5e` | where one device is connected |
| `show spanning-tree` | root bridge, port roles and states |
| `show port-security` | port security status and violations |
| `show etherchannel summary` | link aggregation groups |
| `show cdp neighbors` | directly connected Cisco devices and the ports between them |
| `show cdp neighbors detail` | adds their IP addresses and software versions |
| `show lldp neighbors` | the same, vendor-neutral |

## Routing (layer 3)

| Command | Shows |
|---------|-------|
| `show ip route` | the routing table |
| `show ip route 10.1.1.5` | which route a destination would use |
| `show arp` (or `show ip arp`) | IP-to-MAC mappings |
| `show ip protocols` | which routing protocols run, and their settings |
| `show ip ospf neighbor` | OSPF neighbours and their state |
| `show access-lists` | ACLs with hit counts per line |
| `show ip nat translations` | the NAT table |
| `show ip dhcp binding` | addresses leased by the DHCP server |
| `show ipv6 interface brief` / `show ipv6 route` | the IPv6 equivalents |

## Filtering long output

| Syntax | Does |
|--------|------|
| `show run \| include vlan` | only lines containing "vlan" |
| `show run \| exclude !` | hides matching lines |
| `show run \| begin interface` | starts at the first match |
| `show run \| section ospf` | a whole configuration section |
| `show run interface Gi0/1` | the configuration of one interface |
| `terminal length 0` | no paging, prints everything at once |

- Space: next page; Enter: next line; `q`: stop

## CLI help
- `?`: lists the commands available here; `show ?` lists everything that can be shown
- `sh ip int br`: commands can be shortened as long as they are unambiguous
- Tab completes a command; up arrow recalls the previous one

## A first look at a problem
1. `show ip interface brief`: which interfaces are up, and do they have addresses?
2. `show interfaces <port>`: speed, duplex, errors
3. `show vlan brief` and `show interfaces trunk`: is the port in the right VLAN, is the VLAN carried on the trunk?
4. `show mac address-table`: is the device seen on the expected port?
5. `show arp` and `show ip route`: is there a layer 3 path?
6. `show cdp neighbors`: is the cabling what you think it is?
7. `show logging`: what did the device report when the problem began?
8. `show running-config`: is the configuration what it should be?

## Related commands
- `ping` and `traceroute` also run from the device itself
- `debug` shows events live, but can overload a busy device; turn it off with `undebug all`
- Other vendors use the same ideas with different words: Juniper `show interfaces terse`, `show route`; Linux `ip addr`, `ip route`, `bridge fdb`

https://en.wikipedia.org/wiki/Cisco_IOS
