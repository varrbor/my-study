# Block Storage (EBS and Instance Store)

**EBS (Elastic Block Store)** is persistent, network-attached block storage for EC2 instances—data survives instance stop/termination (unless configured otherwise), and volumes can be detached and reattached to other instances. **Instance Store** is temporary storage physically attached to the host hardware, offering very high I/O performance but data is lost when the instance stops or terminates. EBS is used for durable data like databases, while instance store suits temporary data like caches or buffers.
