# Poor Wireless Security Solutions
- Radio signals leave the building, so anyone in range can capture the traffic
- Several popular "security" measures give little or no real protection
- They mostly stop honest users and only slow an attacker by minutes

## Summary

| Measure | Why it fails | Use instead |
|---------|--------------|-------------|
| Open network (no password) | nothing is encrypted, anyone can join and sniff | WPA2/WPA3; WPA3 Enhanced Open (OWE) for public Wi-Fi |
| WEP | broken encryption, key cracked in minutes | WPA2-AES or WPA3 |
| WPA with TKIP | built on WEP's weak base, deprecated | WPA2-AES (CCMP) or WPA3 |
| Hiding the SSID | the name is still sent in other frames | visible SSID with strong encryption |
| MAC address filtering | MAC addresses are sent in clear and easy to copy | WPA2/WPA3-Enterprise (802.1X) |
| WPS (PIN) | 8-digit PIN can be brute-forced in hours | disable WPS |
| Default credentials and SSID | defaults are published online | change both at setup |
| Weak or shared passphrase | guessed by a dictionary attack offline | long random passphrase, or per-user logins |
| Disabling DHCP / static IPs only | the address range is visible in captured traffic | real authentication |
| Lowering transmit power | a better antenna still reaches the signal | encryption |

## WEP (Wired Equivalent Privacy)
- The original 802.11 security from 1999
- RC4 cipher with a short 24-bit initialization vector (IV) that repeats quickly
- The same static key is shared by everyone and never changes
- Tools such as aircrack-ng recover the key after capturing enough packets
- Deprecated since 2004, never use it

## WPA with TKIP
- 2003 stopgap that ran on old WEP hardware
- Still RC4 underneath, with known weaknesses
- Deprecated; limits speed to 54 Mbps on modern standards

## Hiding the SSID
- Only removes the name from beacon frames
- Clients still send the name when they connect, so any sniffer reveals it
- Side effect: your devices keep calling out for the hidden network wherever they go

## MAC address filtering
- Allows only listed MAC addresses to connect
- MAC addresses are never encrypted, so an attacker reads an allowed one from the air and spoofs it
- High maintenance: every new device must be added by hand

## WPS (Wi-Fi Protected Setup)
- Connect by pressing a button or typing an 8-digit PIN
- The PIN is checked in two halves, which leaves only about 11,000 combinations
- Once the PIN is found the attacker gets the Wi-Fi passphrase, however strong it is

## Weak passphrases on WPA2-Personal
- An attacker captures the 4-way handshake, then guesses passwords offline at high speed
- Short or dictionary passphrases fall quickly; one shared key also means everyone has it forever
- Fix: 16+ random characters, or WPA3 (SAE resists offline guessing), or Enterprise mode

## What actually works
- WPA3-Personal (SAE), or WPA2-Personal with AES and a long passphrase
- WPA2/WPA3-Enterprise: each user logs in with their own credentials through 802.1X and a RADIUS server
- Updated firmware, changed admin password, WPS and remote administration off
- Guest network or separate VLAN for visitors and IoT devices
- Treat public Wi-Fi as untrusted: HTTPS and a VPN

## Common wireless attacks
- Evil twin / rogue AP: a fake access point with a trusted SSID
- Deauthentication: forcing clients to reconnect so the handshake can be captured
- Wardriving: driving around mapping weak networks
- Sniffing: capturing traffic on open or weakly encrypted networks

https://en.wikipedia.org/wiki/Wireless_security
