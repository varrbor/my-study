# Demo: Assign IAM Permissions with Groups and Users

Best practice is to avoid attaching permissions directly to individual IAM users; instead, create Groups (e.g., "Developers," "Admins") with attached policies defining their permissions, then add users to the appropriate group(s). This centralizes permission management—updating a group's policy instantly changes access for every member—making it easier to maintain least-privilege access as teams and responsibilities change.
