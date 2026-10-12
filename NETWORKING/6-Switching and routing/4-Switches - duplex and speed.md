# Switches: Duplex and Speed
- Speed: how many bits per second a link carries (10, 100, 1000 Mbps, 10 Gbps…)
- Duplex: whether the two ends can send at the same time
- Both ends of a link must agree on both; a mismatch gives a slow, error-prone link that still shows as "up"

## Duplex modes

| | Half duplex | Full duplex |
|---|-------------|-------------|
| Direction | one side sends at a time | both sides send at the same time |
| Like | walkie-talkie | phone call |
| Collisions | possible, handled by CSMA/CD | none |
| Used with | hubs, old equipment | switches, all modern links |
| Capacity | less than the nominal speed | full speed in each direction |

- Simplex: one direction only (broadcast TV, a fibre strand)
- Hub: all ports share one collision domain, so half duplex is forced
- Switch: each port is its own collision domain, so full duplex works and CSMA/CD is switched off
- Gigabit and faster Ethernet is full duplex in practice

## CSMA/CD (half duplex only)
1. Listen: wait until the cable is quiet
2. Send, while still listening
3. Collision detected: both stop and send a jam signal
4. Wait a random backoff time and retry

## Ethernet speeds

| Name | Standard | Speed | Typical cable |
|------|----------|-------|---------------|
| Ethernet | 10BASE-T | 10 Mbps | Cat3 |
| Fast Ethernet | 100BASE-TX | 100 Mbps | Cat5 |
| Gigabit Ethernet | 1000BASE-T | 1 Gbps | Cat5e / Cat6 |
| Multigigabit | 2.5GBASE-T / 5GBASE-T | 2.5 / 5 Gbps | Cat5e / Cat6 |
| 10 Gigabit | 10GBASE-T | 10 Gbps | Cat6 (55 m) / Cat6a (100 m) |
| 10 Gigabit fibre | 10GBASE-SR / LR | 10 Gbps | multimode / single-mode fibre |
| Higher | 25, 40, 100 Gbps | | fibre or DAC, data centers |

- A link runs at the highest speed both ends and the cable support
- 1000BASE-T needs all 4 pairs; a cable with a damaged pair falls back to 100 Mbps

## Autonegotiation
- The two ends advertise what they support and choose the best common speed and duplex
- Order of preference: highest speed first, full duplex before half
- Default on almost every port; required for 1000BASE-T
- Auto-MDIX: the port also detects straight-through vs crossover cabling automatically

## Duplex mismatch
- One end full duplex, the other half duplex
- Classic cause: one side set by hand (e.g. 100/full), the other left on auto
- The auto side detects the speed but cannot negotiate duplex, so it falls back to half duplex
- The link stays up and works at low load, then degrades badly as traffic grows

| End | What it sees |
|-----|--------------|
| Half-duplex side | late collisions (it hears the other side sending while it is sending) |
| Full-duplex side | CRC / FCS errors and runts (frames cut off by the other side backing off) |

- Symptoms: slow transfers, packet loss, retransmissions, fine with ping but poor under load
- Rule: set both ends to auto, or both ends to the same fixed values; never mix

## Speed mismatch
- Ends set to different fixed speeds: the link does not come up at all
- Easier to spot than a duplex mismatch

## Checking and setting on a Cisco switch
```
interface GigabitEthernet0/1
 speed auto
 duplex auto

! or fixed, the same on both ends
 speed 100
 duplex full
```

| Command | Shows |
|---------|-------|
| `show interfaces status` | speed and duplex per port; `a-full`, `a-1000` means autonegotiated |
| `show interfaces Gi0/1` | duplex, speed and the error counters |

## Error counters to read

| Counter | Suggests |
|---------|----------|
| Collisions | normal on half duplex, should be zero on full duplex |
| Late collisions | duplex mismatch, or a cable that is too long |
| CRC / FCS errors | duplex mismatch, bad cable or connector, interference |
| Runts (under 64 bytes) | collisions, duplex mismatch |
| Giants (oversized) | MTU mismatch or a faulty NIC |
| Input / output errors | totals of the above |
| Output drops | congestion: more traffic than the port can send |

## Checking on a host
- Windows: `Get-NetAdapter` (PowerShell) shows link speed; duplex is in the adapter's advanced properties
- Linux: `ethtool eth0` shows speed, duplex and autonegotiation
- Linux, setting: `ethtool -s eth0 speed 100 duplex full autoneg off`

## Troubleshooting a slow or flaky port
1. Check speed and duplex on both ends
2. Look at the error counters, clear them, and watch whether they grow
3. Link at 100 Mbps where 1 Gbps is expected: suspect the cable, connector or a damaged pair
4. Replace the patch cable, then try another switch port
5. Set both ends to auto unless a device really requires fixed settings

## Related
- Bandwidth vs throughput: the nominal link speed vs what actually gets through
- Uplinks should be faster than access ports, since they carry everyone's traffic
- Link aggregation (LACP): combines several links for more capacity and redundancy
- Wi-Fi is always half duplex: one device transmits on a channel at a time

https://en.wikipedia.org/wiki/Duplex_mismatch

https://en.wikipedia.org/wiki/Autonegotiation
