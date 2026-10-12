# Port Scanning (nmap and IP Scanners)
- IP scanner: finds which addresses on a network have a live device
- Port scanner: finds which TCP/UDP ports on a device are open, and so which services it runs
- Used for inventory, troubleshooting and security audits
- Scan only networks you own or have written permission to test; unauthorized scanning can be illegal and against policy

## Why scan
- Find what is really on the network: forgotten devices, rogue access points, unknown IPs
- Check a service is listening and reachable through the firewall
- Find an unknown device's address (printer, camera, IoT)
- Audit: spot ports that should not be open (Telnet, RDP exposed to the internet)
- Verify firewall rules do what was intended

## Port states (nmap)

| State | Meaning |
|-------|---------|
| open | a service accepted the connection |
| closed | the host answered, nothing is listening on that port |
| filtered | no answer; a firewall is dropping the packets |
| unfiltered | reachable, but nmap cannot tell open from closed |
| open\|filtered | no answer, common with UDP scans |

## How scans work

| Scan | nmap option | How | Notes |
|------|-------------|-----|-------|
| Ping sweep (host discovery) | `-sn` | ICMP echo, ARP on the local subnet, TCP probes | finds live hosts, no ports scanned |
| TCP connect | `-sT` | completes the full 3-way handshake | no special privileges, logged by the target |
| TCP SYN ("half-open") | `-sS` | sends SYN, reads the reply, never completes the handshake | default with admin/root, fast |
| UDP | `-sU` | sends UDP probes | slow; no reply is ambiguous |
| Version detection | `-sV` | talks to open ports to identify the service and version | |
| OS detection | `-O` | compares TCP/IP behaviour with known fingerprints | needs admin/root |

- SYN scan replies: SYN-ACK = open, RST = closed, nothing = filtered

## nmap basics

| Command | Does |
|---------|------|
| `nmap 192.168.1.10` | scans the 1000 most common TCP ports of one host |
| `nmap 192.168.1.0/24` | scans a whole subnet |
| `nmap 192.168.1.1-50` | scans a range |
| `nmap -sn 192.168.1.0/24` | lists live hosts only |
| `nmap -p 22,80,443 host` | scans specific ports |
| `nmap -p 1-1024 host` | scans a port range |
| `nmap -p- host` | scans all 65535 ports |
| `nmap -F host` | fast, the 100 most common ports |
| `nmap -sV host` | shows service versions |
| `nmap -O host` | guesses the operating system |
| `nmap -A host` | versions, OS, default scripts and traceroute together |
| `nmap -Pn host` | skips the ping check, for hosts that block ICMP |
| `nmap -T4 host` | faster timing (T0 slowest to T5 fastest) |
| `nmap -oN result.txt host` | saves the output to a file |
| `nmap -iL hosts.txt` | reads targets from a file |

- Zenmap: the graphical front end for nmap
- NSE (nmap scripting engine): `--script` runs extra checks, e.g. for known vulnerabilities

## Reading the output
```
PORT     STATE    SERVICE
22/tcp   open     ssh
80/tcp   open     http
443/tcp  open     https
3389/tcp filtered ms-wbt-server
```
- Columns: port and protocol, state, the service usually found on that port
- The service name is a guess from the port number unless `-sV` was used

## IP scanners
- Angry IP Scanner: free, cross-platform, scans a range and shows live hosts, names and open ports
- Advanced IP Scanner: Windows, shows names, MAC addresses, vendors and shared folders
- Fing: phone app, quick list of the devices on a Wi-Fi network
- `arp -a` after a ping sweep: a simple built-in way to list local devices
- The router's DHCP client list also shows connected devices

## Other tools
- `Test-NetConnection host -Port 443` (PowerShell) or `nc -zv host 443`: test one port without a scanner
- masscan: very fast scanner for huge ranges
- Nessus, OpenVAS: vulnerability scanners that go beyond open ports

## Limits and side effects
- Firewalls, NAT and intrusion prevention hide or distort results
- A scan can trigger security alerts and get your address blocked
- Aggressive scans can disturb fragile devices (old printers, industrial equipment)
- An open port is not a vulnerability by itself; it shows what to check next

## Defending against scans
- Close or disable services that are not needed
- Firewall: allow only the required ports, drop the rest
- Keep exposed services patched
- IDS/IPS detects and blocks scanning
- Scan your own network regularly so you see what an attacker would see

https://nmap.org/book/man.html
