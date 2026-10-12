# Other Protocols
- Protocol: an agreed set of rules for how two devices exchange data
- Each application protocol listens on a well-known port (0–1023) over TCP or UDP
- Rule: prefer the encrypted version (SSH over Telnet, HTTPS over HTTP, SFTP over FTP)

## Web

| Protocol | Port | Transport | Purpose |
|----------|------|-----------|---------|
| HTTP | 80 | TCP | web pages, unencrypted |
| HTTPS | 443 | TCP | HTTP over TLS, encrypted |

## File transfer

| Protocol | Port | Transport | Purpose |
|----------|------|-----------|---------|
| FTP | 20 (data), 21 (control) | TCP | file transfer, unencrypted |
| SFTP | 22 | TCP | file transfer over SSH |
| FTPS | 990 | TCP | FTP over TLS |
| TFTP | 69 | UDP | simple transfer, no login (device firmware, configs) |
| SMB | 445 | TCP | Windows file and printer sharing |
| NFS | 2049 | TCP/UDP | Unix/Linux file sharing |

## Email

| Protocol | Port | Transport | Purpose |
|----------|------|-----------|---------|
| SMTP | 25 (587 for submission) | TCP | sending mail |
| POP3 | 110 (995 secure) | TCP | downloading mail to one device |
| IMAP | 143 (993 secure) | TCP | reading mail kept on the server, synced across devices |

## Remote access

| Protocol | Port | Transport | Purpose |
|----------|------|-----------|---------|
| SSH | 22 | TCP | encrypted remote command line |
| Telnet | 23 | TCP | remote command line, unencrypted, avoid |
| RDP | 3389 | TCP | Windows remote desktop |

## Network services and management

| Protocol | Port | Transport | Purpose |
|----------|------|-----------|---------|
| DNS | 53 | UDP/TCP | name resolution |
| DHCP | 67, 68 | UDP | automatic IP configuration |
| NTP | 123 | UDP | clock synchronization |
| SNMP | 161 (162 for traps) | UDP | monitoring and managing network devices |
| Syslog | 514 | UDP | sending logs to a central server |
| LDAP | 389 (636 secure) | TCP | directory services (users, groups) |
| Kerberos | 88 | TCP/UDP | authentication in Windows domains |

## Voice and video
- SIP (5060, 5061 secure): sets up and ends calls
- RTP: carries the audio and video itself, over UDP

## Protocols without ports (below layer 4)
- ICMP: error and diagnostic messages, used by `ping` and `traceroute`
- ARP: finds the MAC address for a known IPv4 address on the local network
- IGMP: manages membership of multicast groups

## Port ranges
- 0–1023: well-known ports
- 1024–49151: registered ports
- 49152–65535: dynamic (ephemeral) ports, used by clients as source ports

https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
