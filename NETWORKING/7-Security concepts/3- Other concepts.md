# Other Security Concepts
- Ideas that complete the CIA triad: who gets access, how much to trust, how to weigh risk, and which kinds of controls exist
- Useful as a vocabulary for discussing any security design

## AAA

| | Question | Examples |
|---|----------|----------|
| Identification | who do you claim to be? | username, badge number |
| Authentication | can you prove it? | password, token, fingerprint |
| Authorization | what may you do? | permissions, roles, ACLs |
| Accounting | what did you do? | logs, audit trails |

- RADIUS: network access (Wi-Fi, VPN, 802.1X), UDP, encrypts only the password
- TACACS+: administering network devices, TCP, encrypts the whole session, authorizes per command

## Authentication factors

| Factor | Examples |
|--------|----------|
| Something you know | password, PIN |
| Something you have | phone app, hardware key, smart card |
| Something you are | fingerprint, face |
| Somewhere you are | location, network |
| Something you do | typing pattern |

- MFA: two or more different factors; two passwords are not MFA
- SSO (single sign-on): log in once, use many services

## Access control models
- DAC (discretionary): the owner of a resource decides who gets access (file permissions)
- MAC (mandatory): the system enforces labels such as "secret"; users cannot override
- RBAC (role-based): access follows the job role
- ABAC (attribute-based): rules over attributes such as department, device, time, location

## Core principles

| Principle | Meaning |
|-----------|---------|
| Least privilege | only the access the task requires, nothing more |
| Need to know | access to data only if the job requires it |
| Separation of duties | critical tasks need more than one person |
| Defense in depth | several independent layers of protection |
| Zero trust | never trust by network location; verify every request |
| Implicit deny | whatever is not explicitly allowed is blocked |
| Fail secure | on failure, stay closed rather than open |
| Security through obscurity | hiding how something works; not a real defence on its own |

## Non-repudiation and authenticity
- Non-repudiation: someone cannot deny an action they performed
- Achieved with digital signatures, timestamps and protected logs
- Authenticity: the data or message really comes from the claimed source

## Risk terms

| Term | Meaning |
|------|---------|
| Asset | what you are protecting |
| Vulnerability | a weakness |
| Threat | what could exploit it |
| Threat actor | who would do it |
| Exploit | how it is done |
| Risk | likelihood × impact |
| Control (countermeasure) | what reduces the risk |

## Handling risk

| Response | Meaning | Example |
|----------|---------|---------|
| Mitigate | reduce it with controls | patch, firewall, MFA |
| Transfer | pass the cost to someone else | cyber insurance, outsourcing |
| Avoid | stop the risky activity | retire the old system |
| Accept | live with it, knowingly | low impact, expensive to fix |

- Residual risk: what remains after the controls

## Types of security controls

| By nature | Examples |
|-----------|----------|
| Technical (logical) | firewall, encryption, antivirus, ACLs |
| Administrative (managerial) | policies, training, background checks |
| Physical | locks, fences, cameras, guards |

| By function | Purpose | Examples |
|-------------|---------|----------|
| Preventive | stop it happening | firewall, lock, MFA |
| Detective | notice it happening | IDS, logs, cameras |
| Corrective | fix it afterwards | restore from backup, patch |
| Deterrent | discourage it | warning banner, visible camera |
| Compensating | substitute when the main control is not possible | extra monitoring of a system that cannot be patched |

## Threat actors
- Script kiddies: use ready-made tools, low skill
- Cybercriminals: after money (ransomware, fraud)
- Hacktivists: political or social motives
- Insiders: employees or contractors, malicious or careless
- Nation-state groups (APT): well funded, patient, targeted
- White hat: authorized testers; black hat: criminals; grey hat: in between

## Social engineering
- Attacking people instead of technology
- Phishing: fake emails; spear phishing: targeted at one person; whaling: aimed at executives
- Vishing (phone) and smishing (SMS)
- Pretexting: an invented story to gain trust
- Tailgating: following someone through a secured door
- Shoulder surfing, dumpster diving, baiting with a USB stick
- Defence: training, verification procedures, MFA

## Assessment
- Vulnerability scan: automated search for known weaknesses
- Penetration test: authorized attempt to actually exploit them
- Audit: checking that controls and policies are followed
- Red team attacks, blue team defends, purple team combines them
- Honeypot: a decoy system that attracts and records attackers

## Monitoring
- Logs: who did what and when; send them to a central server
- SIEM: collects and correlates logs, raises alerts
- NTP: synchronized clocks make logs comparable
- Baseline: knowing what normal looks like so anomalies stand out

https://en.wikipedia.org/wiki/Computer_security
