# Understand AWS Regions and Availability Zones

A **Region** is a geographic area (e.g., us-east-1, eu-west-1) containing multiple, isolated data center clusters. Each Region is composed of two or more **Availability Zones (AZs)**—physically separate facilities with independent power, cooling, and networking, connected by low-latency links. Deploying across multiple AZs within a Region provides fault tolerance and high availability, since the failure of one AZ doesn't take down the others. Choosing a Region affects latency, cost, and compliance with data-residency requirements.
