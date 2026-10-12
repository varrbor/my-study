# The Cloud
- Cloud computing: on-demand computing resources (servers, storage, networks, software) delivered over a network
- Someone else's data center, rented instead of owned
- Pay for what you use (OpEx) instead of buying hardware up front (CapEx)

## Essential characteristics (NIST)
- On-demand self-service: provision resources yourself, no ticket to a human
- Broad network access: reachable over the network from any device
- Resource pooling: many customers share the provider's hardware (multi-tenancy)
- Rapid elasticity: scale up and down quickly as demand changes
- Measured service: usage is metered and billed

## Deployment models

| Model | Who uses it | Notes |
|-------|-------------|-------|
| Public | anyone, shared infrastructure | AWS, Azure, Google Cloud; cheapest to start, least control |
| Private | one organization | on-premises or hosted; more control and cost |
| Hybrid | one organization, public + private linked | sensitive data stays private, burst to public |
| Community | several organizations with shared needs | e.g. government or healthcare clouds |
| Multi-cloud | one organization, several public providers | avoids lock-in, harder to manage |

## How it works
- Virtualization: a hypervisor runs many virtual machines on one physical server
- Regions and availability zones: separate data centers for low latency and redundancy
- Everything is driven by APIs, so infrastructure can be automated (infrastructure as code)

## Networking in the cloud
- Virtual network (VPC / VNet): your private, isolated network inside the provider
- Subnets, route tables, security groups and virtual firewalls replace physical gear
- Connect to it over the internet, a site-to-site VPN, or a dedicated private link (Direct Connect, ExpressRoute)
- The WAN link to the provider becomes critical: no connectivity, no service

## Pros and cons
- Pros: no hardware to buy, fast to scale, global reach, provider handles maintenance
- Cons: recurring cost, dependence on the provider and the internet link, less control, data location and compliance concerns
- Shared responsibility: the provider secures the cloud, the customer secures what they put in it

https://en.wikipedia.org/wiki/Cloud_computing
