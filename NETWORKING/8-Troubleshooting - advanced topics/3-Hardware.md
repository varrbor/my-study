# Hardware
- Hardware troubleshooting: finding faults at layer 1, in cables, connectors, ports, transceivers, power and the devices themselves
- A large share of network problems are physical, so check here first
- Method: look at the indicators, read the counters, then swap one component at a time for a known good one

## Signs of a hardware problem
- No link light, or a link that goes up and down (flapping)
- Link at a lower speed than expected (100 Mbit/s instead of 1 Gbit/s)
- Growing CRC, input error or collision counters
- Intermittent drops that follow a cable, a port or a time of day
- Device hot, noisy, rebooting on its own, or showing amber or red LEDs
- The problem moves when you move the cable or the device to another port

## Reading the LEDs

| LED | Meaning |
|-----|---------|
| Link off | no cable, bad cable, other end off, port disabled |
| Link green, steady | connected |
| Link blinking | traffic |
| Amber link | lower speed, or port blocked or disabled (varies by vendor) |
| System amber or red | boot failure, fan, temperature or power fault |
| PoE amber | PoE fault or power budget exceeded |

- Colours differ between vendors: check the device's documentation

## Copper cable faults

| Fault | Effect |
|-------|--------|
| Open | a wire is broken; no link or lower speed |
| Short | two wires touch; no link |
| Miswire / wrong pinout | pairs connected in the wrong order |
| Split pair | right pins, wrong pairing; link comes up but with heavy errors at speed |
| Crosstalk (NEXT, FEXT) | signal leaking between pairs, usually from poor termination |
| Attenuation | signal too weak: cable too long or poor quality |
| EMI | interference from power cables, motors, fluorescent lights |
| Over 100 m | errors and drops |
| Wrong category | Cat5 where Cat6a is needed limits the speed |
| Damaged connector | broken clip, bent pins, intermittent contact |

- Gigabit needs all 4 pairs: one bad pair drops the link to 100 Mbit/s
- Keep untwisting at the connector to a minimum, and respect the bend radius

## Fibre faults

| Fault | Effect |
|-------|--------|
| Dirty connector | the most common cause of loss; clean before connecting |
| Tight bend or kink | light leaks out |
| Break | no light |
| Transmit and receive swapped | no link; swap the two strands |
| Wrong fibre type | single-mode and multimode do not mix |
| Wrong or mismatched transceivers | different wavelength or type at each end |
| Too much loss | too many connectors or splices, or too long |
| Too much light | a long-range optic on a short link can overload the receiver; add an attenuator |

- Never look into a fibre or an optic port: the light is invisible and can damage the eye

## Tools

| Tool | Use |
|------|-----|
| Cable tester | continuity, pinout, opens, shorts, split pairs |
| Cable certifier | proves a run meets its category at speed |
| Tone generator and probe | finds one cable in a bundle or at the patch panel |
| TDR | distance to a fault on copper |
| OTDR | distance to a break or bad splice on fibre |
| Optical power meter and light source | measures loss on a fibre link |
| Visual fault locator | red laser that shows breaks and tight bends |
| Fibre inspection scope and cleaning kit | checks and cleans connector end faces |
| Loopback plug | sends a port's output back to its input to test the port itself |
| Multimeter | voltage, continuity, power supply output |
| PoE tester | shows whether a port delivers power, and how much |
| Wi-Fi analyzer | signal strength, channels, overlapping networks |
| Spectrum analyzer | non-Wi-Fi interference |
| Crimper and punch-down tool | re-terminating a connector or jack |
| Network tap | copies traffic for capture without disturbing the link |

## Switch and router hardware
- Ports: one bad port, try another; err-disabled ports need the cause fixed, then `shutdown` / `no shutdown`
- Transceivers (SFP): reseat, swap, check compatibility with the device and the fibre
- Power supply: failed unit, or one of two redundant units down
- Fans and temperature: blocked airflow and dust cause overheating, errors and shutdowns
- Memory and CPU: constantly high use causes slowness and dropped packets
- Flash or storage failure: the device does not boot or loses its configuration
- Ageing: capacitors and power supplies fail first, often after a power cycle

| Cisco command | Shows |
|---------------|-------|
| `show interfaces` | errors, speed and duplex per port |
| `show interfaces status` | err-disabled and not-connected ports |
| `show interfaces transceiver` | optical transmit and receive power |
| `show environment` | temperature, fans, power supplies |
| `show power inline` | PoE use per port and the remaining budget |
| `show inventory` | modules and serial numbers |
| `show logging` | link flaps and hardware messages |
| `show version` | uptime and the reason for the last restart |
| `test cable-diagnostics tdr interface Gi0/1` | built-in cable test on supported switches |

## Host hardware
- NIC: disabled, faulty, or wrong or old driver
- Check the link light at both ends, and the adapter in Device Manager (Windows) or `ip link` / `ethtool eth0` (Linux)
- Speed and duplex settings: leave on auto unless there is a reason
- Energy-saving settings can put the adapter to sleep
- Try another cable, another port, then a USB network adapter to rule out the NIC

## Power
- Check the obvious first: plugged in, switched on, power strip, breaker
- UPS: battery age and runtime; a failing UPS causes random restarts
- PoE: the standards differ in power, and the switch has a total budget

| Standard | Name | Power at the port |
|----------|------|-------------------|
| 802.3af | PoE | 15.4 W |
| 802.3at | PoE+ | 30 W |
| 802.3bt | PoE++ | 60 W / 90–100 W |

- A device that needs PoE+ on a PoE port may fail to boot or keep restarting
- Power available at the device is lower than at the port, because of cable loss

## Environment
- Heat: keep airflow clear, front to back; clean the filters
- Humidity, dust and vibration shorten equipment life
- Electrostatic discharge (ESD): use a wrist strap when handling modules
- Interference: keep data cables away from power cables and machinery
- Labels and documentation: an unlabelled rack turns a 5-minute fix into an hour

## Wireless hardware
- Access point without power (PoE) or without an uplink
- Antennas loose, damaged or pointing the wrong way
- Too far, too many walls, or a metal obstacle
- Interference on the channel: check with a Wi-Fi analyzer
- Too many clients on one access point

## Isolating the fault
1. Check power and LEDs at both ends
2. Reseat the cable and the transceiver
3. Read the interface counters; clear them and watch whether they grow
4. Swap the patch cable for a known good one
5. Move to another port on the switch
6. Test or swap the device at the far end, or its NIC
7. Test the permanent cable run with a tester
8. Swap the transceiver, then the device
9. Change one thing at a time, and put it back if it made no difference

## Prevention
- Quality cables and connectors, certified after installation
- Clean fibre connectors, and dust caps on unused ports and optics
- Redundant power supplies and links for important devices
- Monitoring (SNMP) with alerts for temperature, errors and link changes
- Spare cables, transceivers and at least one spare switch
- Firmware kept up to date; documentation and labels kept current

https://en.wikipedia.org/wiki/Networking_hardware

https://en.wikipedia.org/wiki/Power_over_Ethernet
