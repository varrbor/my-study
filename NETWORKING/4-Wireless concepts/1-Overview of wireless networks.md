# Overview of Wireless Networks
- Wireless network: devices communicate with radio waves instead of cables
- WLAN (wireless LAN): a LAN built on Wi-Fi, defined by the IEEE 802.11 standards
- Works at OSI layers 1 and 2; from layer 3 up it is the same as a wired network

## Components
- Wireless client (station): laptop, phone, IoT device with a wireless NIC
- Access point (AP): bridges wireless clients onto the wired LAN
- Wireless router: AP + switch + router + NAT + DHCP in one box (home networks)
- Wireless LAN controller (WLC): manages many APs centrally (enterprise networks)
- Antennas: omnidirectional (all directions) or directional (focused, longer range)

## Key terms
- SSID: the network name clients see
- BSS: one AP and its clients; BSSID: the AP's MAC address
- ESS: several APs sharing one SSID, so clients can roam between them
- Channel: the slice of the frequency band an AP transmits on
- Roaming: a client moves from one AP to another without dropping the connection

## Modes
- Infrastructure: clients connect through an AP (the normal case)
- Ad hoc (IBSS): devices connect directly to each other, no AP
- Mesh: APs relay traffic to each other wirelessly, only some are wired
- Wi-Fi Direct: device-to-device link, e.g. printing or screen casting

## Frequency bands

| Band | Range | Speed | Notes |
|------|-------|-------|-------|
| 2.4 GHz | longest, passes walls best | lowest | crowded; only channels 1, 6, 11 do not overlap |
| 5 GHz | shorter | higher | many non-overlapping channels, less interference |
| 6 GHz | shortest | highest | Wi-Fi 6E and 7 only, very little congestion |

- Higher frequency = more speed, less range and wall penetration
- Wider channels (20, 40, 80, 160 MHz) = more speed, fewer free channels

## Wi-Fi standards

| Standard | Name | Bands | Max speed (theoretical) |
|----------|------|-------|-------------------------|
| 802.11b | – | 2.4 GHz | 11 Mbps |
| 802.11a | – | 5 GHz | 54 Mbps |
| 802.11g | – | 2.4 GHz | 54 Mbps |
| 802.11n | Wi-Fi 4 | 2.4 and 5 GHz | 600 Mbps |
| 802.11ac | Wi-Fi 5 | 5 GHz | 6.9 Gbps |
| 802.11ax | Wi-Fi 6 / 6E | 2.4, 5 (and 6) GHz | 9.6 Gbps |
| 802.11be | Wi-Fi 7 | 2.4, 5 and 6 GHz | 46 Gbps |

- Newer standards are backward compatible with older clients on the same band
- MIMO: several antennas send several data streams at once

## How devices share the air
- Radio is a shared, half-duplex medium: only one device can transmit on a channel at a time
- CSMA/CA (collision avoidance): listen first, wait a random time, then send, and wait for an acknowledgement
- Wired Ethernet used CSMA/CD (collision detection); wireless cannot detect collisions while sending
- More clients on one AP = less airtime for each

## What affects the signal
- Distance from the AP
- Obstacles: walls, metal, water, concrete (absorption and reflection)
- Interference: other Wi-Fi networks on the same channel, microwaves, Bluetooth, cordless phones
- Signal strength is measured in dBm (−30 excellent, −67 good, −80 poor)
- Site survey: measuring coverage to decide where to place APs and which channels to use

## Wireless vs wired

| | Wireless | Wired |
|---|----------|-------|
| Mobility | high | none |
| Installation | easy, no cabling to clients | cabling needed |
| Speed and stability | lower, varies | higher, consistent |
| Latency | higher | lower |
| Security | signal leaves the building, encryption is essential | physical access needed |

## Security in one line
- Use WPA2 or WPA3; WEP and open networks are insecure

## Other wireless technologies
- Bluetooth: short range personal devices (PAN)
- NFC: a few centimetres, payments and tags
- Zigbee, Z-Wave: low-power IoT and home automation
- Cellular (4G/5G): wide area mobile data
- Satellite: remote locations

https://en.wikipedia.org/wiki/Wireless_LAN
