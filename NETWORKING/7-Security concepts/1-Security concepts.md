# Security Concepts
- Network security: protecting data, devices and services from unauthorized access, misuse and disruption
- No single control is enough; security is layers of controls plus people and processes
- Goal: reduce risk to an acceptable level, not eliminate it

## CIA triad

| Goal | Means | Threatened by | Protected by |
|------|-------|---------------|--------------|
| Confidentiality | only authorized people can read the data | sniffing, data theft | encryption, access control |
| Integrity | data is not altered without authorization | tampering, man in the middle | hashing, digital signatures |
| Availability | systems work when needed | DoS, hardware failure, ransomware | redundancy, backups, DDoS protection |

## AAA
- Authentication: who are you? (password, certificate, biometrics)
- Authorization: what are you allowed to do? (permissions, roles)
- Accounting: what did you do? (logs, audit trails)
- AAA servers: RADIUS (network access, Wi-Fi, VPN) and TACACS+ (device administration)
- MFA (multi-factor): two or more of something you know, have, are
- Non-repudiation: proof that someone did something, so they cannot deny it

## Vocabulary

| Term | Meaning |
|------|---------|
| Asset | anything of value: data, device, service |
| Vulnerability | a weakness (unpatched software, weak password) |
| Threat | something that could exploit a weakness |
| Exploit | the method or code that uses a vulnerability |
| Risk | likelihood × impact of a threat using a vulnerability |
| Attack surface | all the points an attacker could try |
| Zero-day | a vulnerability with no patch available yet |
| Mitigation | a control that reduces the risk |

## Core principles
- Defense in depth: several independent layers, so one failure is not a breach
- Least privilege: give only the access needed for the job
- Zero trust: never trust by location, verify every user and device every time
- Segmentation: separate networks (VLANs, DMZ) so a breach cannot spread
- Separation of duties: no single person controls a whole critical process
- Secure by default: everything denied unless explicitly allowed
- Keep it patched: most attacks use known, already fixed vulnerabilities

## Common attacks

| Attack | What happens |
|--------|--------------|
| Phishing / social engineering | tricking a person into giving credentials or running malware |
| Malware | viruses, worms, trojans, spyware, ransomware (encrypts data for payment) |
| DoS / DDoS | flooding a service so legitimate users cannot reach it |
| Man in the middle (on-path) | intercepting traffic between two parties, e.g. by ARP spoofing |
| Sniffing | capturing unencrypted traffic |
| Spoofing | faking an IP, MAC, DNS answer or email sender |
| Password attacks | brute force, dictionary, credential stuffing |
| Rogue AP / evil twin | a fake access point that clients connect to |
| DNS poisoning | false DNS answers sending users to a fake site |
| VLAN hopping, MAC flooding | layer 2 attacks against switches |
| Insider threat | misuse by someone who already has access |

## Network security devices

| Device | Does |
|--------|------|
| Firewall | allows or blocks traffic by rules (IP, port, state, application) |
| NGFW | firewall plus application awareness, intrusion prevention, content inspection |
| IDS | detects suspicious traffic and alerts |
| IPS | detects and blocks it inline |
| Proxy / web filter | controls and inspects outbound web traffic |
| WAF | protects web applications from attacks such as SQL injection |
| VPN gateway | encrypted tunnels for remote users and sites |
| NAC | checks a device before letting it on the network (802.1X) |
| SIEM | collects logs from everything and correlates them |

- Stateless firewall: judges each packet alone; stateful: tracks connections and allows the replies
- Rules are read top to bottom, first match wins, with an implicit "deny all" at the end

## Network zones
- Trusted (inside): the internal LAN
- Untrusted (outside): the internet
- DMZ: a separate network for public-facing servers (web, mail), isolated from the internal LAN
- Guest and IoT networks: internet only, no access to internal systems

## Encryption

| Type | How | Examples | Use |
|------|-----|----------|-----|
| Symmetric | one shared key encrypts and decrypts | AES | fast, bulk data |
| Asymmetric | public key encrypts, private key decrypts | RSA, ECC | key exchange, signatures |
| Hashing | one-way fingerprint, not reversible | SHA-256 | integrity, password storage |

- In transit: TLS/HTTPS, SSH, IPsec, WPA2/WPA3
- At rest: disk and database encryption (BitLocker, LUKS)
- Certificate: binds a public key to an identity, signed by a certificate authority (PKI)
- Digital signature: a hash encrypted with a private key, giving integrity and non-repudiation

## VPN
- Encrypted tunnel across an untrusted network
- Remote access VPN: one user to the company network
- Site-to-site VPN: two networks joined permanently
- Protocols: IPsec, SSL/TLS (OpenVPN), WireGuard

## Secure and insecure protocols

| Insecure | Use instead |
|----------|-------------|
| Telnet | SSH |
| HTTP | HTTPS |
| FTP | SFTP / FTPS |
| SNMP v1/v2c | SNMP v3 |
| WEP, WPA | WPA2, WPA3 |
| POP3 / IMAP / SMTP in clear | the TLS versions |

## Hardening devices
- Change default usernames and passwords
- Update firmware and software
- Disable unused ports and services
- Manage over SSH/HTTPS only, from a management network
- Switches: port security, DHCP snooping, dynamic ARP inspection
- Back up configurations; send logs to a central server; synchronize clocks with NTP

## Physical security
- Locked server rooms and racks, badges, cameras
- Physical access to a device defeats most other controls

## People and process
- Security awareness training: people are the most common entry point
- Policies: acceptable use, passwords, incident response
- Backups: 3-2-1 rule (3 copies, 2 media types, 1 offsite), and test the restores
- Incident response: prepare, detect, contain, eradicate, recover, learn

https://en.wikipedia.org/wiki/Network_security

https://en.wikipedia.org/wiki/Information_security
