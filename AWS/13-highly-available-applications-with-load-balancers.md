# Create Highly Available Applications with Load Balancers

Load balancers distribute incoming traffic across multiple targets (EC2 instances, containers, IPs) in one or more Availability Zones, improving fault tolerance and scalability. If one target or AZ fails, traffic is automatically routed to healthy targets, keeping the application available. Combined with health checks, load balancers detect and route around unhealthy instances, forming a core piece of highly available architecture.
