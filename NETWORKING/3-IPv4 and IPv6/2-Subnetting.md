# Subnetting
- Subnetting: splitting one IP network into several smaller networks (subnets)
- Done by borrowing bits from the host portion and adding them to the network portion
- Each borrowed bit doubles the number of subnets and halves the hosts in each

## Why subnet
- Smaller broadcast domains, less broadcast traffic
- Security and control: traffic between subnets must pass a router or firewall
- Organization: one subnet per department, floor, VLAN or site
- Efficient use of addresses: size each network to what it needs

## Key formulas
- Number of subnets = 2^(borrowed bits)
- Hosts per subnet = 2^(host bits) − 2 (minus the network and broadcast addresses)
- Block size = 256 − the mask value in the interesting octet
- Host bits = 32 − prefix length

## CIDR cheat sheet (last octet)

| Prefix | Mask | Block size | Usable hosts |
|--------|------|------------|--------------|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 |
| /31 | 255.255.255.254 | 2 | 2 (point-to-point links only) |
| /32 | 255.255.255.255 | 1 | 1 (a single host) |

- Same pattern in the other octets: /16 = 255.255.0.0, /20 = 255.255.240.0, /8 = 255.0.0.0
- Mask values to memorize: 128, 192, 224, 240, 248, 252, 254, 255

## Finding the subnet of an address
1. Find the interesting octet: the one where the mask is not 255 or 0
2. Block size = 256 − mask value in that octet
3. Network address = the largest multiple of the block size that is ≤ the address octet
4. Broadcast address = next network − 1
5. Usable hosts = everything between the network and broadcast addresses

## Example 1: 192.168.1.130/26
- Mask 255.255.255.192, block size 256 − 192 = 64
- Subnets start at .0, .64, .128, .192
- Network: 192.168.1.128
- Broadcast: 192.168.1.191
- Usable hosts: 192.168.1.129 – 192.168.1.190 (62 hosts)

## Example 2: 172.16.50.200/20
- Mask 255.255.240.0, interesting octet is the third, block size 256 − 240 = 16
- Subnets in the third octet: 0, 16, 32, 48, 64…
- Network: 172.16.48.0
- Broadcast: 172.16.63.255
- Usable hosts: 172.16.48.1 – 172.16.63.254 (4094 hosts)

## Example 3: split 192.168.1.0/24 into 4 subnets
- 4 subnets = 2^2, so borrow 2 bits: /24 becomes /26

| Subnet | Network | Usable hosts | Broadcast |
|--------|---------|--------------|-----------|
| 1 | 192.168.1.0/26 | .1 – .62 | .63 |
| 2 | 192.168.1.64/26 | .65 – .126 | .127 |
| 3 | 192.168.1.128/26 | .129 – .190 | .191 |
| 4 | 192.168.1.192/26 | .193 – .254 | .255 |

## VLSM (Variable Length Subnet Mask)
- Subnets of different sizes inside one network, sized to each need
- Always allocate the largest subnet first
- Example: 192.168.10.0/24 for 100, 50, 20 hosts and a 2-host router link

| Need | Subnet | Range | Usable hosts |
|------|--------|-------|--------------|
| 100 hosts | 192.168.10.0/25 | .0 – .127 | 126 |
| 50 hosts | 192.168.10.128/26 | .128 – .191 | 62 |
| 20 hosts | 192.168.10.192/27 | .192 – .223 | 30 |
| 2 hosts | 192.168.10.224/30 | .224 – .227 | 2 |

## Related ideas
- Two hosts are on the same subnet if their network addresses match; otherwise traffic goes to the default gateway
- Supernetting (route summarization): the reverse, combining several networks into one shorter prefix
- Common mistakes: assigning the network or broadcast address to a host, overlapping subnets, wrong mask on one device

https://en.wikipedia.org/wiki/Subnet
