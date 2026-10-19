# Elasticity with EC2 Auto Scaling Groups

An Auto Scaling Group (ASG) manages a collection of EC2 instances, automatically launching new instances when demand increases (based on metrics like CPU utilization) and terminating instances when demand drops, within configured minimum/maximum/desired capacity limits. ASGs also replace unhealthy instances automatically, ensuring both elasticity and resilience. They're typically used together with a load balancer to distribute traffic across the dynamically changing fleet.
