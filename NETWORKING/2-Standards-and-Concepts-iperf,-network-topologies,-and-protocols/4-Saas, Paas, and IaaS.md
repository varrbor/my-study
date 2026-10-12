# SaaS, PaaS and IaaS
- Cloud service models: they differ in how much the provider manages and how much you manage
- The higher the model, the less you control and the less you maintain

## IaaS (Infrastructure as a Service)
- You rent virtual machines, storage and networks
- Provider manages: data center, hardware, virtualization
- You manage: operating system, runtime, applications, data
- Most control and most work
- Examples: AWS EC2, Azure Virtual Machines, Google Compute Engine
- For: system and network administrators

## PaaS (Platform as a Service)
- You get a ready platform to deploy code onto
- Provider manages: everything in IaaS plus the operating system, runtime and middleware
- You manage: your application and its data
- Examples: Heroku, Google App Engine, Azure App Service, AWS Elastic Beanstalk
- For: developers

## SaaS (Software as a Service)
- You use finished software, usually in a browser
- Provider manages everything; you manage only your data and user accounts
- Least control and least work
- Examples: Gmail, Microsoft 365, Salesforce, Slack, Zoom
- For: end users

## Who manages what

| Layer | On-premises | IaaS | PaaS | SaaS |
|-------|-------------|------|------|------|
| Application | you | you | you | provider |
| Data | you | you | you | provider (your content) |
| Runtime, middleware | you | you | provider | provider |
| Operating system | you | you | provider | provider |
| Virtualization | you | provider | provider | provider |
| Servers, storage | you | provider | provider | provider |
| Networking | you | provider | provider | provider |

## Pizza analogy
- On-premises: make it at home
- IaaS: take and bake, you rent the kitchen and ingredients
- PaaS: delivery, you only set the table
- SaaS: dining out, everything is done for you

## Related models
- FaaS / serverless: you deploy single functions, billed per execution (AWS Lambda)
- DaaS: desktop as a service, a virtual desktop delivered over the network
- XaaS: "anything as a service", the general term

https://en.wikipedia.org/wiki/Cloud_computing#Service_models
