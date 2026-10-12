# Configuring a Wireless Router
- A home/small-office wireless router is several devices in one: router, switch, access point, NAT, DHCP server, firewall
- WAN (internet) port goes to the modem or ISP; LAN ports and Wi-Fi serve your devices
- Configuration is done in a web interface or the vendor's app

## Getting in
1. Connect the WAN port to the modem, and a computer to a LAN port (cable is safer than Wi-Fi for setup)
2. Find the router address: the default gateway shown by `ipconfig` (often 192.168.0.1 or 192.168.1.1)
3. Open that address in a browser
4. Log in with the default credentials printed on the label

## First things to change
- Admin password: defaults are public knowledge
- Firmware: update to the latest version, it fixes security holes
- SSID: a name that does not reveal the vendor, model or owner
- Wi-Fi security: WPA2-Personal (AES) or WPA3-Personal, with a long passphrase
- Disable WPS and remote (WAN-side) administration

## WAN (internet) settings

| Type | When |
|------|------|
| DHCP (dynamic IP) | most cable and fibre connections, automatic |
| PPPoE | DSL and some fibre, needs a username and password from the ISP |
| Static IP | business lines, address given by the ISP |

## LAN settings
- Router LAN address: the default gateway for all clients, e.g. 192.168.1.1/24
- DHCP server: on, with a pool such as 192.168.1.100 – 192.168.1.200
- Lease time: how long a client keeps its address
- DHCP reservation: always give the same address to a device (printer, NAS)
- DNS: the ISP's servers by default, or public ones (1.1.1.1, 8.8.8.8)

## Wireless settings

| Setting | Recommendation |
|---------|----------------|
| Band | enable 2.4 GHz and 5 GHz (and 6 GHz if supported) |
| Mode | newest standards your devices support; mixed mode for old clients |
| Channel (2.4 GHz) | 1, 6 or 11, whichever is least crowded |
| Channel (5 GHz) | auto is usually fine |
| Channel width | 20 MHz on 2.4 GHz; 80 MHz on 5 GHz |
| Security | WPA2-AES or WPA3; never WEP or WPA-TKIP |
| Transmit power | default; lower it only to reduce overlap between APs |

- Same SSID on both bands lets clients pick (band steering); separate SSIDs give manual control

## Useful features
- Guest network: internet-only Wi-Fi isolated from your LAN, for visitors and IoT devices
- Port forwarding: send an inbound port to an inside device (game server, camera)
- DMZ host: forwards all inbound traffic to one device, avoid if possible
- UPnP: lets devices open ports automatically, convenient but a security risk
- QoS: prioritize traffic such as calls and video
- Parental controls, scheduling, MAC filtering
- Dynamic DNS: a name that follows your changing public IP

## Placement
- Central, high, in the open; away from metal, thick walls, microwaves
- For larger homes add wired access points or a mesh system rather than raising power

## After setup
- Check a client gets an address, gateway and DNS: `ipconfig /all`
- Test: `ping` the router, then `ping 8.8.8.8`, then a name
- Save a backup of the configuration
- Factory reset (hold the reset button) returns everything to defaults if you are locked out

https://en.wikipedia.org/wiki/Wireless_router
