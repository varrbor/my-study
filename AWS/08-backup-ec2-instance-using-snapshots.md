# Back up an EC2 Instance using Snapshots

Snapshots are point-in-time backups of EBS (Elastic Block Store) volumes attached to EC2 instances, stored durably in S3. They are incremental—after the first full snapshot, subsequent snapshots only save changed blocks, saving storage and cost. Snapshots can be used to restore a volume, create a new volume in a different AZ/Region, or create an AMI for launching new instances, making them essential for disaster recovery and instance cloning.
