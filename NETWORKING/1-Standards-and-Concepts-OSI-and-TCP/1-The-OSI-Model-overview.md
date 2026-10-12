The OSI Model Overview
7. Application: user-facing protocols (HTTP, DNS, SMTP)
6. Presentation: encoding, encryption, compression (TLS, JSON)
5. Session: opens, maintains and closes connections
4. Transport: end-to-end delivery, ports (TCP, UDP)
3. Network: logical addressing and routing (IP, routers)
2. Data Link: node-to-node frames, MAC addresses (Ethernet, switches)
1. Physical: raw bits over cable, fiber or radio

● Conceptual model, real networks run on TCP/IP
● Sending: data is encapsulated going down the layers
● Receiving: data is decapsulated going up the layers
● Units: data → segment → packet → frame → bits
● Used to localize problems ("it's a layer 3 issue")

https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/
