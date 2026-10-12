# RDP: Remote Access
- RDP (Remote Desktop Protocol): Microsoft's protocol for using a Windows computer's desktop from another device
- You see the remote screen and send your keyboard and mouse; the programs run on the remote machine
- Default port: TCP 3389 (also UDP 3389 for better performance)

## How it works
- RDP server (host): the computer being controlled, running Remote Desktop Services
- RDP client: the device you sit at; `mstsc.exe` on Windows, the "Windows App" / Microsoft Remote Desktop on macOS, iOS and Android, Remmina or FreeRDP on Linux
- The session is encrypted with TLS
- NLA (Network Level Authentication): the user authenticates before the desktop session is created, which protects the host
- Can redirect the clipboard, drives, printers, audio and USB devices between the two machines

## Requirements
- Host edition: Windows Pro, Enterprise or Server (Home can connect out, but cannot be a host)
- Remote Desktop enabled on the host
- The user is an administrator or a member of the Remote Desktop Users group
- The account has a password
- The firewall allows TCP 3389 from the client
- The host is switched on and not asleep

## Enabling it on the host
- Settings → System → Remote Desktop → On
- Or: `sysdm.cpl` → Remote tab → Allow remote connections to this computer
- Keep "Require Network Level Authentication" ticked
- Add users under "Select users" if they are not administrators
- Windows adds the firewall rule automatically for private and domain networks

## Connecting
1. Find the host's name or address: `hostname`, `ipconfig`
2. On the client run `mstsc`
3. Enter the computer name or IP address
4. Enter the username (`COMPUTER\user` or `DOMAIN\user`) and password
5. Accept the certificate warning only if you expect it (self-signed certificate on the host)

| Command | Does |
|---------|------|
| `mstsc` | opens the Remote Desktop client |
| `mstsc /v:192.168.1.20` | connects to a host |
| `mstsc /v:192.168.1.20:3390` | connects on another port |
| `mstsc /f` | full screen |
| `mstsc /admin` | connects to the console session of a server |
| `mstsc /multimon` | uses all monitors |
| `Test-NetConnection 192.168.1.20 -Port 3389` | checks that the port is reachable |
| `query user` (or `quser`) | shows who is logged on to the host |

## Sessions
- Desktop Windows: one user at a time; the local screen locks while someone is connected remotely
- Windows Server: two administrative sessions by default; more users need Remote Desktop Services licences
- Disconnect: programs keep running on the host; sign out: the session ends

## Security
- RDP exposed directly to the internet is one of the most common ways attackers get in: brute-forced passwords, stolen credentials, ransomware
- Never forward port 3389 from the internet to a host

| Do | Why |
|----|-----|
| Reach it through a VPN | RDP is then not visible from the internet |
| Or use an RD Gateway | wraps RDP in HTTPS (443) with its own authentication |
| Require NLA | authentication before a session is created |
| Strong unique passwords and MFA | stops guessing and reused credentials |
| Account lockout policy | slows brute force |
| Limit who may log on | Remote Desktop Users group, least privilege |
| Restrict source addresses in the firewall | only known networks can connect |
| Keep Windows patched | RDP has had serious flaws, e.g. BlueKeep (2019) |
| Log and monitor logons | spot attempts early |
| Turn it off where it is not needed | smaller attack surface |

- Changing the port from 3389 only reduces automated noise; it is not protection

## Troubleshooting

| Symptom | Check |
|---------|-------|
| "Can't connect to the remote computer" | host on and awake, Remote Desktop enabled, right name or IP |
| Works by IP, not by name | DNS |
| Times out | firewall or router blocking 3389; test with `Test-NetConnection` |
| Works on the LAN, not from outside | no VPN, or NAT/firewall in between |
| "Logon attempt failed" | wrong credentials, or the username needs a `COMPUTER\` or `DOMAIN\` prefix |
| "Connection was denied… not authorized for remote login" | user not in the Remote Desktop Users group |
| Blank password refused | accounts without a password cannot use RDP |
| NLA / CredSSP error | client or host is missing updates |
| Certificate warning | self-signed certificate on the host: expected on a home network |
| Black screen or very slow | lower the resolution and colour depth; check bandwidth and latency |

1. `ping` the host
2. Test the port
3. Check that Remote Desktop is enabled and the service is running
4. Check the firewall on the host and on the path
5. Check the user's rights

## Other remote access methods

| Method | Port | Use |
|--------|------|-----|
| SSH | 22 | encrypted command line, Linux and network devices; also file transfer and tunnels |
| Telnet | 23 | unencrypted command line, avoid |
| VNC | 5900 | screen sharing, cross-platform; encryption varies by product |
| VPN | varies | puts your device on the remote network; other tools then work as if local |
| RD Gateway | 443 | RDP over HTTPS |
| TeamViewer, AnyDesk, Chrome Remote Desktop | outbound 443 | work through NAT without port forwarding, via the vendor's servers |
| Quick Assist (Windows) | outbound 443 | helping another user, with their consent |
| Out-of-band: iLO, iDRAC, IPMI, console server | separate | reach a server or device when its operating system or network is down |

- RDP vs VNC: RDP gives each user their own session and is efficient; VNC shares the screen that is physically displayed
- RDP vs SSH: graphical desktop vs command line
- RDP vs VPN: RDP controls one computer; a VPN gives network access, and the two are often used together

https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients

https://en.wikipedia.org/wiki/Remote_Desktop_Protocol
