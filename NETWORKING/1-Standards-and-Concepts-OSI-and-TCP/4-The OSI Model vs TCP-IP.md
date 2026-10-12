The OSI Model vs TCP/IP
● OSI: 7 layers, theoretical reference model (ISO), used for teaching and troubleshooting
● TCP/IP: 4 layers, practical model built around the protocols the internet actually runs
● Both split communication into layers, each layer serves the one above it

Layer mapping (TCP/IP ← OSI)
4. Application ← Application, Presentation, Session (HTTP, DNS, TLS, SSH)
3. Transport ← Transport (TCP, UDP)
2. Internet ← Network (IP, ICMP)
1. Network Access (Link) ← Data Link, Physical (Ethernet, Wi-Fi, ARP)

Differences
● OSI was designed first and protocols came later; TCP/IP describes protocols that already worked
● OSI separates presentation and session; in TCP/IP the application handles both
● OSI separates data link and physical; TCP/IP treats them as one network access layer
● Some courses use a 5-layer TCP/IP model that keeps data link and physical separate
● OSI protocols were never widely adopted, TCP/IP won in practice

In everyday use
● Layer numbers are still OSI ("layer 2 switch", "layer 3 routing", "layer 7 load balancer")
● Data unit per layer: data → segment (transport) → packet (internet) → frame (network access) → bits
● Each layer adds its own header on the way down (encapsulation) and strips it on the way up

https://en.wikipedia.org/wiki/Internet_protocol_suite
