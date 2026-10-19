# Demo: Using ECS to Run Docker Containers in AWS

Running containers on ECS typically involves: pushing a Docker image to Amazon ECR (Elastic Container Registry), creating a task definition referencing that image, and launching it as a task or service within an ECS cluster. With Fargate as the launch type, AWS provisions the underlying compute automatically, so you only specify CPU/memory needs and networking—no EC2 instances to patch or scale manually.
