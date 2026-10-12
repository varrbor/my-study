# Important Commands
- Command-line tools for checking configuration, connectivity, name resolution and connections
- Same ideas on every system, different names on Windows and Linux/macOS

## Overview

| Task | Windows | Linux / macOS |
|------|---------|---------------|
| Show IP configuration | `ipconfig` | `ip addr` (old: `ifconfig`) |
| Test reachability | `ping` | `ping` |
| Trace the route | `tracert` | `traceroute` |
| Trace + loss per hop | `pathping` | `mtr` |
| DNS lookup | `nslookup` | `dig`, `nslookup`, `host` |
| Connections and listening ports | `netstat` | `ss` (old: `netstat`) |
| ARP table | `arp -a` | `ip neigh` (old: `arp -a`) |
| Routing table | `route print` | `ip route` |
| Computer name | `hostname` | `hostname` |
| Test a TCP port | `Test-NetConnection host -Port 443` | `nc -zv host 443` |

## ipconfig (Windows)
- Shows the IP address, subnet mask and default gateway of each adapter

| Command | Does |
|---------|------|
| `ipconfig` | basic address information |
| `ipconfig /all` | adds MAC address, DHCP server, DNS servers, lease times |
| `ipconfig /release` | gives up the DHCP lease |
| `ipconfig /renew` | asks DHCP for a new lease |
| `ipconfig /flushdns` | clears the local DNS cache |
| `ipconfig /displaydns` | shows the local DNS cache |

- 169.254.x.x address: no answer from DHCP
- Linux: `ip addr`, `ip link`, `ip route`

## ping
- Sends ICMP echo requests and waits for echo replies
- Shows whether a host is reachable, the round-trip time and packet loss

| Command | Does |
|---------|------|
| `ping 8.8.8.8` | 4 pings on Windows; continuous on Linux |
| `ping -t host` | continuous on Windows (Ctrl+C to stop) |
| `ping -n 10 host` | 10 pings on Windows (`-c 10` on Linux) |
| `ping -l 1400 host` | set the packet size on Windows (`-s` on Linux) |
| `ping -4 host` / `ping -6 host` | force IPv4 or IPv6 |

| Result | Meaning |
|--------|---------|
| Reply from … time=20ms | reachable, 20 ms round trip |
| Request timed out | no reply: host down, or ICMP blocked by a firewall |
| Destination host unreachable | no route, or the local target did not answer ARP |
| Could not find host | DNS failed to resolve the name |
| TTL expired in transit | routing loop |

- No reply does not always mean the host is down: many firewalls block ping

## tracert / traceroute
- Shows every router (hop) on the path to a destination, with the delay to each
- Works by sending packets with TTL 1, 2, 3…; each router that drops one reveals itself
- Windows `tracert` uses ICMP; Linux `traceroute` uses UDP by default
- `* * *` on a hop: that router does not answer, not necessarily a fault
- The path stops answering from one hop onward: the problem is at or after that hop
- `tracert -d host`: skip name lookups, faster
- `pathping host` (Windows) or `mtr host` (Linux): packet loss at every hop

## nslookup
- Queries DNS; available on Windows, Linux and macOS

| Command | Does |
|---------|------|
| `nslookup example.com` | resolve a name using the default DNS server |
| `nslookup example.com 8.8.8.8` | ask a specific DNS server |
| `nslookup -type=mx example.com` | ask for a record type (mx, ns, txt, aaaa…) |
| `nslookup 8.8.8.8` | reverse lookup, IP to name |

- "Non-authoritative answer": the reply came from a resolver's cache, which is normal

## dig (Linux / macOS)
- More detailed DNS tool, the usual choice on Linux

| Command | Does |
|---------|------|
| `dig example.com` | A record with full detail |
| `dig example.com MX` | a specific record type |
| `dig @8.8.8.8 example.com` | ask a specific server |
| `dig +short example.com` | only the answer |
| `dig -x 8.8.8.8` | reverse lookup |
| `dig +trace example.com` | follow the lookup from the root servers down |

- The answer section shows the record and its remaining TTL in seconds

## netstat
- Shows active connections and the ports the machine is listening on

| Command | Does |
|---------|------|
| `netstat -a` | all connections and listening ports |
| `netstat -n` | numbers instead of names, faster |
| `netstat -o` | adds the process ID (Windows) |
| `netstat -b` | adds the program name (Windows, run as administrator) |
| `netstat -ano` | common combination on Windows |
| `netstat -r` | routing table |
| `netstat -e` / `netstat -s` | interface and per-protocol statistics |

- States: LISTENING (waiting for connections), ESTABLISHED (open), TIME_WAIT (closing)
- Use it to see which program holds a port, or to spot unexpected connections
- Linux: `ss -tulpn` shows listening TCP/UDP ports with their processes

## arp
- `arp -a`: shows the ARP cache, the IP-to-MAC mappings learned on the local network
- `arp -d`: clears it
- Two IPs with the same MAC, or a changed gateway MAC, can indicate ARP spoofing

## route
- `route print` (Windows) or `ip route` (Linux): shows the routing table
- The 0.0.0.0 entry is the default route, pointing to the default gateway

## Other useful tools
- `hostname`: the computer's name
- `getmac` (Windows): MAC addresses
- `telnet host 80` or `nc -zv host 80`: test whether a TCP port is open
- `curl -I https://example.com`: test a web server and see the response headers
- `whois example.com`: who registered a domain
- `nmap host`: scan for open ports (only on networks you are allowed to scan)
- `tcpdump` or Wireshark: capture and inspect packets

## Which tool for which symptom

| Symptom | Start with |
|---------|------------|
| No network at all | `ipconfig /all` |
| Can't reach a host | `ping`, then `tracert` |
| Slow or unstable connection | `ping -t`, `pathping` / `mtr` |
| Works by IP but not by name | `nslookup` / `dig`, `ipconfig /flushdns` |
| Service not reachable on a port | `Test-NetConnection` / `nc`, `netstat` on the server |
| "Port already in use" | `netstat -ano` / `ss -tulpn` |

https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands
