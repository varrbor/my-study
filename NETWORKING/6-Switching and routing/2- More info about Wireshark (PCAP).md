# More About Wireshark (PCAP)
- PCAP (packet capture): a file holding captured packets exactly as they appeared on the wire, with timestamps
- Capture once, analyze later, share with a colleague or a vendor
- Wireshark reads and writes PCAP files; so do tcpdump, tshark and most security tools

## File formats

| Format | Extension | Notes |
|--------|-----------|-------|
| pcap | `.pcap` | the classic format, supported everywhere |
| pcapng | `.pcapng` | Wireshark's default; several interfaces in one file, comments, name resolution data |

- Capture libraries: libpcap (Linux, macOS), Npcap (Windows, installed with Wireshark)
- File → Save As converts between the formats

## Ways to capture

| Tool | Use |
|------|-----|
| Wireshark | graphical capture and analysis |
| `tcpdump` | command line, ideal on servers without a screen |
| `tshark` | Wireshark's command-line version, same filters |
| `dumpcap` | lightweight capture engine for long captures |
| `pktmon` | built into Windows 10/11 and Server |
| Device capture | many firewalls, routers and switches can export a PCAP |

## tcpdump essentials

| Command | Does |
|---------|------|
| `tcpdump -D` | lists interfaces |
| `tcpdump -i eth0` | captures on an interface and prints to the screen |
| `tcpdump -i eth0 -w capture.pcap` | writes the packets to a file |
| `tcpdump -r capture.pcap` | reads a file |
| `tcpdump -i eth0 host 192.168.1.10` | only one host |
| `tcpdump -i eth0 port 53` | only one port |
| `tcpdump -i eth0 -c 100` | stops after 100 packets |
| `tcpdump -n` | no name lookups |

- Typical workflow: capture on the server with `tcpdump -w`, copy the file, open it in Wireshark

## Capture filters vs display filters

| | Capture filter | Display filter |
|---|----------------|----------------|
| When | before capturing | after capturing |
| Effect | decides what is saved, the rest is lost | hides packets, nothing is lost |
| Syntax | BPF: `host 10.0.0.5 and port 80` | Wireshark: `ip.addr == 10.0.0.5 && tcp.port == 80` |
| Use | busy links, long captures | everyday analysis |

- When unsure, capture everything and narrow down with display filters

## More display filters

| Filter | Shows |
|--------|-------|
| `tcp.stream eq 5` | one TCP conversation |
| `tcp.analysis.retransmission` | retransmitted segments (loss) |
| `tcp.analysis.flags` | everything Wireshark flagged as a TCP problem |
| `tcp.flags.reset == 1` | connection resets |
| `tcp.flags.syn == 1 && tcp.flags.ack == 0` | new connection attempts |
| `dns.flags.rcode != 0` | failed DNS lookups |
| `http.response.code >= 400` | HTTP errors |
| `tls.handshake.type == 1` | TLS Client Hello (shows the server name) |
| `dhcp` | DHCP exchange (DORA) |
| `frame contains "password"` | packets containing a text |
| `!(arp or dns or icmp)` | hide the noise |

- Right-click a field → Apply as Filter: builds the filter for you
- The filter bar turns green when the syntax is valid, red when not

## Reading a capture
- Time column: View → Time Display Format; "seconds since previous displayed packet" reveals delays
- Colours: light purple TCP, light blue UDP, black with red text = problems (errors, resets, retransmissions)
- Follow → TCP/UDP/HTTP Stream: reassembles one conversation into readable text
- Expert Information (Analyze menu): a summary of warnings and errors
- Right-click a field → Apply as Column: adds it to the packet list

## Statistics menu

| Item | Tells you |
|------|-----------|
| Capture File Properties | duration, packet count, average rate |
| Protocol Hierarchy | which protocols make up the traffic |
| Conversations | who talks to whom, and how much |
| Endpoints | every address seen, by volume |
| I/O Graphs | traffic over time, spikes and gaps |
| Flow Graph | a sequence diagram of a conversation |

## What to look for

| Symptom | In the capture |
|---------|----------------|
| Cannot connect | SYN with no reply (filtered) or SYN answered by RST (port closed) |
| Slow application | long gap between a request and its response |
| Packet loss | retransmissions, duplicate ACKs |
| Name problems | DNS queries with no answer or NXDOMAIN |
| No IP address | DHCP Discover with no Offer |
| Dropped sessions | unexpected RST or FIN |

- TCP 3-way handshake: SYN → SYN-ACK → ACK; the time between them is the network round trip

## Managing large captures
- Capture → Options: ring buffer, e.g. 10 files of 100 MB, the oldest is overwritten
- Snap length: keep only the first bytes (headers) of each packet to save space
- `editcap -c 100000 big.pcap part.pcap`: splits a file
- `mergecap -w all.pcap a.pcap b.pcap`: merges files
- File → Export Specified Packets: saves only the displayed packets

## Encrypted traffic
- TLS payload is unreadable, but addresses, ports, timing, sizes and the server name (SNI) are visible
- Decrypting your own browser traffic: set the `SSLKEYLOGFILE` environment variable, then point Wireshark to that file (Preferences → Protocols → TLS)
- File → Export Objects → HTTP: extracts files transferred over unencrypted HTTP

## Care with PCAP files
- A capture can contain passwords, cookies, emails and personal data
- Capture only where you are authorized
- Store captures securely, share the minimum, and trim or anonymize before sending them out

https://www.wireshark.org/docs/wsug_html_chunked/

https://wiki.wireshark.org/DisplayFilters
