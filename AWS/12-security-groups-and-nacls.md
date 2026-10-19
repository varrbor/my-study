# Security Groups and NACLs

**Security Groups** act as virtual firewalls at the instance level, controlling inbound/outbound traffic with allow-only rules (stateful—if traffic is allowed in, the response is automatically allowed out). **NACLs (Network Access Control Lists)** operate at the subnet level, supporting both allow and deny rules, and are stateless (inbound and outbound rules are evaluated separately). Security Groups are the primary, more commonly used mechanism; NACLs add an extra layer of defense at the network boundary.
