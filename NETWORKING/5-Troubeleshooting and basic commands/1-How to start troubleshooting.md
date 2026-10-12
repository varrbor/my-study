# How to Start Troubleshooting
- Troubleshooting: a structured way to find and fix the cause of a problem, not random guessing
- Goal: narrow down where the fault is, change one thing at a time, confirm the fix
- Start with the simple and obvious before the complex

## Troubleshooting methodology (CompTIA)

| Step | What to do |
|------|------------|
| 1. Identify the problem | gather information, question users, find symptoms, ask what changed, try to reproduce it |
| 2. Establish a theory of probable cause | question the obvious, consider several causes |
| 3. Test the theory | confirmed → next step; not confirmed → new theory or escalate |
| 4. Establish a plan of action | decide the fix and consider its side effects |
| 5. Implement the solution | or escalate if it is outside your authority |
| 6. Verify full functionality | confirm it works for the user, add preventive measures |
| 7. Document | findings, actions and outcome |

## Questions to ask first
- What exactly does not work? What is the error message?
- When did it start? Did it ever work?
- What changed? (update, new device, moved cable, new configuration)
- Who is affected: one user, one room, one site, everyone?
- Is it constant or intermittent? Can you reproduce it?

## Scope tells you where to look

| Who is affected | Likely location |
|-----------------|-----------------|
| One device | that device: cable, NIC, IP settings, software |
| Several devices on one switch or AP | that switch, AP or its uplink |
| One subnet or VLAN | the gateway, DHCP or VLAN configuration |
| Everyone, internal still works | the internet link, firewall or ISP |
| One website or service only | DNS or the remote service |

## Approaches using the OSI model
- Bottom-up: start at layer 1 (cable, link light) and move up; good when the cause may be physical
- Top-down: start at the application and move down; good when most things work
- Divide and conquer: start in the middle with `ping`; if it works the lower layers are fine, so look up, otherwise look down
- Follow the path: trace the traffic hop by hop from source to destination
- Compare: check against a device that works
- Swap: replace a suspect cable, port or device with a known good one

## Quick checks by layer

| Layer | Check |
|-------|-------|
| 1 Physical | cable plugged in, link lights on, Wi-Fi connected, device powered |
| 2 Data Link | correct VLAN, switch port up, MAC address learned |
| 3 Network | IP address, subnet mask, default gateway, routing |
| 4 Transport | port open, firewall not blocking |
| 7 Application | DNS resolves, service running, credentials valid |

## A basic connectivity sequence
1. `ipconfig /all`: is there a valid address? (169.254.x.x means DHCP failed)
2. `ping 127.0.0.1`: is the local TCP/IP stack working?
3. Ping your own IP address: is the NIC working?
4. Ping the default gateway: is the local network working?
5. Ping a public address such as 8.8.8.8: is routing to the internet working?
6. Ping a name such as google.com: is DNS working?

- The first step that fails shows where the problem is

## Good habits
- Change one thing at a time and test after each change
- Undo a change that did not help
- Back up a configuration before changing it
- Do not assume: verify what the user tells you and what "should" be working
- Most problems are simple: unplugged cables, wrong passwords, typos, a recent change
- Escalate when it is beyond your access or knowledge, and pass on what you already tried
- Write it down: the next person, possibly you, will hit the same problem

https://en.wikipedia.org/wiki/Troubleshooting
