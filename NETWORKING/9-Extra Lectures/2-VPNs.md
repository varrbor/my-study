# VPNs
- VPN (Virtual Private Network): an encrypted tunnel across an untrusted network, usually the internet
- Makes a remote device or site behave as if it were on the private network
- Provides confidentiality (encryption), integrity (tamper detection) and authentication (both ends prove who they are)

## How it works
- Tunneling: the original packet is encrypted and wrapped inside a new packet (encapsulation)
- The outer packet travels across the internet between the two VPN endpoints
- The far endpoint unwraps and decrypts it, then forwards the original packet into the private network
- Observers on the path see only that the two endpoints exchange encrypted data
- The client gets a virtual network adapter and an address from the remote network

## Types

| Type | Connects | Typical use |
|------|----------|-------------|
| Remote access (client-to-site) | one device to a network | employees working from home or travelling |
| Site-to-site | two whole networks, router to router | head office to branch, office to cloud |
| Clientless (SSL portal) | a browser to selected web applications | contractors, unmanaged devices |
| Host-to-host | two single machines | server-to-server links |
| Commercial "privacy" VPN | one device to a provider's server | hiding traffic from the local network or ISP, changing apparent location |

- Site-to-site: users notice nothing, the routers or firewalls do the work
- Remote access: the user runs a VPN client and logs in

## Full tunnel vs split tunnel

| | Full tunnel | Split tunnel |
|---|-------------|--------------|
| Traffic through the VPN | everything | only traffic for the private network |
| Internet traffic | goes via the company, inspected by its firewall | goes directly from the user's connection |
| Security | higher, consistent | lower, the device is on two networks at once |
| Performance | slower, more load on the VPN | faster |

## Protocols

| Protocol | Ports | Notes |
|----------|-------|-------|
| IPsec (IKEv2) | UDP 500, UDP 4500 (NAT traversal), ESP (protocol 50) | the standard for site-to-site; also remote access, good on mobile |
| SSL/TLS VPN (e.g. OpenVPN) | TCP or UDP 443 / UDP 1194 | passes through most firewalls; common for remote access |
| WireGuard | UDP 51820 | modern, small, fast, simple to configure |
| L2TP/IPsec | UDP 1701, 500, 4500 | L2TP has no encryption itself, IPsec adds it; legacy |
| SSTP | TCP 443 | Microsoft, runs over TLS |
| PPTP | TCP 1723, GRE | broken encryption, do not use |
| GRE | protocol 47 | tunnel only, no encryption; combined with IPsec |

## IPsec in brief
- A suite of protocols working at layer 3
- IKE (Internet Key Exchange): the two ends authenticate and agree on keys; phase 1 builds a secure channel, phase 2 builds the data tunnels
- ESP (Encapsulating Security Payload): encrypts and authenticates the data
- AH (Authentication Header): integrity only, no encryption; rarely used, breaks through NAT
- Tunnel mode: the whole original packet is encrypted and given a new IP header (site-to-site)
- Transport mode: only the payload is encrypted (host-to-host)
- Authentication: pre-shared key or certificates
- Both ends must use matching settings: encryption (AES), hash (SHA-2), Diffie-Hellman group, lifetimes

## Authentication
- Pre-shared key: simple, same secret on both ends; fine for a few site-to-site tunnels
- Certificates: stronger, scale better
- Username and password, checked against RADIUS, LDAP or Active Directory
- MFA should be required for remote access

## Benefits and limits

| Benefits | Limits |
|----------|--------|
| Protects traffic on public and untrusted networks | adds overhead: lower speed, higher latency |
| Remote access to internal resources | once connected, the user is on the network: a compromised device brings its problems in |
| Connects sites cheaply over the internet, instead of leased lines | the VPN gateway is itself an exposed target and must be kept patched |
| Hides internal addressing | does not protect against malware or phishing |
| | a commercial VPN shifts trust from your ISP to the provider; it is not anonymity |

## Common problems

| Symptom | Likely cause |
|---------|--------------|
| Cannot connect at all | firewall or ISP blocks the ports; wrong server address |
| Authentication fails | wrong credentials, expired certificate, wrong pre-shared key, clock out of sync |
| IPsec tunnel will not come up | settings do not match on the two ends |
| Connected, but nothing is reachable | routing: no route to the remote network, or no return route |
| Reach by IP, not by name | DNS is not being sent through the tunnel |
| Local and remote networks use the same range | overlapping subnets (both 192.168.1.0/24): renumber one side or use NAT |
| Large transfers stall, small ones work | MTU: the tunnel adds headers, so packets get too big; lower the MTU / MSS |
| Fails behind a home router | NAT: needs NAT traversal (UDP 4500) |
| Slow | encryption load, distance to the gateway, full tunnel sending everything through it |
| Drops when the network changes | use a protocol that handles roaming (IKEv2, WireGuard) |

## Good practice
- Modern protocols only: IKEv2/IPsec, WireGuard, OpenVPN; no PPTP
- MFA for every remote access user
- Least privilege: VPN users reach only what they need, enforced by firewall rules
- Keep the VPN gateway and clients patched
- Check the device's health before allowing it on (updates, antivirus)
- Log connections and review them
- Kill switch on the client: block traffic if the tunnel drops
- Remove access promptly when people leave

## Alternatives and related
- ZTNA (zero trust network access): gives access per application after checking the user and device, instead of to the whole network
- SD-WAN: manages several WAN links and builds encrypted tunnels between sites automatically
- MPLS / leased lines: private links from a carrier; reliable, expensive, not encrypted by default
- SSH tunnels: forwarding single ports through an SSH connection
- Tor: anonymity through several relays, a different goal from a VPN

https://en.wikipedia.org/wiki/Virtual_private_network

https://en.wikipedia.org/wiki/IPsec
