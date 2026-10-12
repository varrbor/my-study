# Iperf
- iperf: a tool that measures how much data a network path can actually carry between two hosts
- You run it on both ends: one as server, one as client; the client sends test traffic and both report the result
- Answers "is the network slow, or is it the application?" by testing the network alone

## What it measures

| Metric | Meaning | Protocol |
|--------|---------|----------|
| Throughput (bitrate) | data actually delivered per second | TCP and UDP |
| Retransmissions | TCP segments sent again, a sign of loss | TCP |
| Jitter | variation in packet delay | UDP |
| Packet loss | datagrams that never arrived | UDP |

- Bandwidth: what the link could carry; throughput: what really gets through

## Versions
- iperf3: the current version, default port 5201, one test at a time per server
- iperf2: older, default port 5001, still maintained, better at some multi-threaded and multicast tests
- The two are not compatible: use the same version on both ends
- Free, on Windows, Linux, macOS, and built into many routers and NAS devices

## Basic use
1. On the server: `iperf3 -s`
2. Allow the port through the firewall (TCP and UDP 5201)
3. On the client: `iperf3 -c 192.168.1.20`
4. Read the summary lines at the end

- Default test: TCP, 10 seconds, client sends to server, one stream

## Common options

| Option | Does |
|--------|------|
| `-s` | run as server |
| `-c host` | run as client and connect to the server |
| `-p 5202` | use another port (both ends) |
| `-t 30` | run for 30 seconds |
| `-i 1` | report every second |
| `-P 4` | 4 parallel streams |
| `-R` | reverse: the server sends, the client receives (tests download) |
| `--bidir` | both directions at once |
| `-u` | UDP instead of TCP |
| `-b 100M` | target bitrate (UDP default is only 1 Mbit/s; `-b 0` = unlimited) |
| `-w 1M` | TCP window / socket buffer size |
| `-l 1400` | size of each write or datagram |
| `-O 2` | omit the first 2 seconds (TCP slow start) from the result |
| `-f m` | show results in Mbit/s (`k`, `m`, `g`) |
| `-4` / `-6` | force IPv4 or IPv6 |
| `-J` | output as JSON |
| `-1` | server exits after one test |
| `-D` | run the server in the background |

## Examples

| Command | Tests |
|---------|-------|
| `iperf3 -c 192.168.1.20` | upload from the client, TCP, 10 s |
| `iperf3 -c 192.168.1.20 -R` | download to the client |
| `iperf3 -c 192.168.1.20 -t 60 -i 5` | one minute, report every 5 s |
| `iperf3 -c 192.168.1.20 -P 8` | 8 streams, to fill a fast link |
| `iperf3 -c 192.168.1.20 -u -b 10M` | UDP at 10 Mbit/s: jitter and loss |
| `iperf3 -c 192.168.1.20 -u -b 0` | UDP as fast as possible |

## Reading TCP output
```
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  1.10 GBytes   943 Mbits/sec    0             sender
[  5]   0.00-10.00  sec  1.10 GBytes   941 Mbits/sec                  receiver
```
- Interval: the time covered by the line
- Transfer: how much data was moved
- Bitrate: the throughput
- Retr: TCP retransmissions; more than a few points to loss, a bad cable, a duplex mismatch or congestion
- Use the receiver line: it is what really arrived

## Reading UDP output
```
[ ID] Interval           Transfer     Bitrate         Jitter    Lost/Total Datagrams
[  5]   0.00-10.00  sec  11.9 MBytes  10.0 Mbits/sec  0.045 ms  0/8633 (0%)  receiver
```
- Jitter: should be low for voice and video (under about 30 ms)
- Lost/Total: packet loss; voice suffers above about 1%
- UDP sends at the rate you ask for, whether or not the network can carry it, so raise `-b` step by step until loss appears

## TCP or UDP
- TCP test: realistic maximum throughput; TCP slows down by itself when it sees loss
- UDP test: loss and jitter at a chosen rate; right for judging voice, video and real-time traffic

## What a result means

| Result | Likely cause |
|--------|--------------|
| About 940 Mbit/s on a gigabit link | normal (protocol overhead) |
| About 94 Mbit/s where 1 Gbit/s is expected | link negotiated at 100 Mbit/s: cable, port or NIC |
| Low and uneven, many retransmissions | bad cable, duplex mismatch, interference, congestion |
| Good one way, poor the other | asymmetric link, or a duplex or QoS problem in one direction |
| More with `-P` than with one stream | TCP window or CPU limit on one stream, not the link |
| Much lower over Wi-Fi than the link rate | normal: half duplex, distance, interference, shared airtime |
| Good iperf, slow application | the problem is the application, disk or server, not the network |

## Getting trustworthy results
- Test both directions (`-R`)
- Run long enough (30 s or more) and repeat at different times
- Use wired endpoints, unless Wi-Fi is what you are testing
- The endpoints must be fast enough: a slow CPU or a 100 Mbit/s NIC limits the result
- Test segment by segment to find the slow hop: same switch, then across the router, then across the WAN
- For 10 Gbit/s and more use parallel streams and larger windows

## Cautions
- A test fills the link, so it disturbs real users: run it at quiet times or cap it with `-b`
- Test only on networks you manage or have permission to test
- Do not leave an iperf server running and exposed: it has no authentication by default
- Public iperf servers exist for internet tests, but results depend on their load

## Related tools
- `ping`: latency and loss, not throughput
- `mtr` / `pathping`: loss and delay per hop
- Online speed tests: measure the path to the internet, not your internal network
- Wireshark: explains why throughput is low (retransmissions, window sizes)

https://iperf.fr/iperf-doc.php

https://software.es.net/iperf/
