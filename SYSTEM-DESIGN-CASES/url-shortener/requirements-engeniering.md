# Requirements Engineering: Summary

The first step of any system design interview: find out **what** to build and **how well** it must work before drawing any boxes.

- **Functional requirements (FR):** what the system is supposed to do.
- **Non-functional requirements (NFR):** how the system is expected to work.

## 1. Functional Requirements

**1. Which problem does it solve?**
- Start from the general problem users want solved. The purpose drives both the features and the NFRs.
- Example (Todoo): users want to be more productive with everyday tasks → feature: simple list with items and due dates → NFR: low latency.

**2. Which features are essential to solve the problem?**
- **Core features:** the bare minimum that solves the problem (Todoo: create, modify, complete items).
- **Support features:** make solving it convenient (Todoo: item list, due date).
- Design for the core features. Mention the support features and park them.

## 2. Non-Functional Requirements

Find the 1–2 NFRs the interviewer cares about most. They set the system attributes, the trade-offs and the user experience.

| NFR | Definition | Notes |
|---|---|---|
| **Availability** | Share of time the system is up and running per year | 99.9% ≈ 8.8 h/yr down, 99.99% ≈ 52.6 min, 99.999% ("five nines") ≈ 5.26 min. Achieved through **reliability, redundancy, fault tolerance** (no single point of failure). |
| **Data consistency** | Data looks the same on all corresponding nodes at the same time | Strong consistency = **linearizability**: every read sees the latest write. The weaker form is *eventual consistency*. |
| **Scalability** | Handling a fast-growing user base and temporary load spikes seamlessly | Relevant to every design. **Vertical**: a bigger machine (more CPU/RAM). Simple, but has a hard ceiling and is a single point of failure. **Horizontal**: a cluster of regular servers, scaled by adding nodes. No ceiling, but you have to handle distribution. |
| **Latency** | Time (ms) for a single message/request to be delivered | Shaped by the database and data model (query performance), caching, CDNs, and geographic proximity. |
| **Compatibility** | Working seamlessly with other software, hardware and systems | Matters for a wide, diverse user base. For example, YouTube works regardless of bandwidth, browser or client device. |
| **Security** | Mostly out of scope | Very broad and deep, so only make it an NFR if you're confident. Otherwise include the standard measures: TLS for traffic, API keys and rate limiting, authentication/authorization, encryption at rest. |

## 3. Initial System Analysis

**1. Read-heavy or write-heavy?**
- Affects how you scale databases, add redundancy to services, and how effective caching is (caching helps reads, not writes).
- Sets attribute priority: a read-heavy system should rather fail to write than fail to read.

**2. Single server or distributed architecture?**
- Distribution (CDN, services, DB, message queue on separate machines) gives scale and redundancy.
- Network = complexity: every network hop can fail, add latency, or split the cluster. Pick the simplest architecture that meets the NFRs.

**3. Availability or data consistency?**
- **CAP theorem:** with a network **P**artition you can keep only **C**onsistency *or* **A**vailability. Partitions are unavoidable in distributed systems, so the real choice is C vs A.
- **Option A, CP:** unreachable nodes refuse requests. Availability drops, state stays consistent (e.g. banking, inventory).
- **Option B, AP:** several write nodes keep serving, state diverges temporarily and is reconciled later (eventual consistency) (e.g. social feeds, likes, URL redirects).
- Ask which behaviour is more desirable for *this* product.

## 4. Expected Scale (back-of-the-envelope)

| Metric | Meaning |
|---|---|
| **DAU / MAU** | Daily or monthly active users. The key scale metric. |
| **Peak active users** | Spikes from events (Todoo before Christmas) reach some multiple of the average DAU. Good designs handle peaks. |
| **Interactions per user** | Estimate one interaction type (read *or* write), then apply the **read:write ratio**. Core features only. |
| **Request size** | Payload size per request. Turns request counts into bandwidth and storage. |
| **Replication factor** | Copies of each piece of data. More read scalability and redundancy, but multiplies storage. |

**Useful formulas**
- Avg QPS = DAU × requests per user per day / 86,400 (≈ 10⁵ s/day)
- Peak QPS = Avg QPS × peak factor (e.g. 2–10×)
- Bandwidth = QPS × request size
- Storage per year = writes per day × object size × 365 × replication factor

## Resources

**Requirements step (FR / NFR)**
- <a href="https://hellointerview.com/learn/system-design/in-a-hurry/delivery" target="_blank" rel="noopener noreferrer">Hello Interview – Delivery Framework</a>: ~5 min on requirements: functional first, then non-functional, then scale.
- <a href="https://www.designgurus.io/course-play/grokking-the-system-design-interview/doc/functional-vs-nonfunctional-requirements" target="_blank" rel="noopener noreferrer">DesignGurus – Functional vs Non-functional Requirements</a>
- <a href="https://www.tryexponent.com/blog/system-design-interview-guide" target="_blank" rel="noopener noreferrer">Exponent – Complete System Design Interview Guide</a>: ~8 min clarifying the problem, common NFRs.
- <a href="https://blog.algomaster.io/p/system-design-interview-tips" target="_blank" rel="noopener noreferrer">AlgoMaster – System Design Interview Tips</a>: questions to ask about NFRs (read- vs write-heavy, acceptable downtime).

**Availability vs consistency (CAP)**
- <a href="https://blog.algomaster.io/p/cap-theorem-explained" target="_blank" rel="noopener noreferrer">AlgoMaster – CAP Theorem Explained</a>
- <a href="https://www.mintlify.com/ByteByteGoHq/system-design-101/guides/database/cap-theorem" target="_blank" rel="noopener noreferrer">ByteByteGo system-design-101 – CAP theorem</a>
- <a href="https://levelupcoding.beehiiv.com/p/pacelc-theorem-clearly-explained" target="_blank" rel="noopener noreferrer">Level Up Coding – PACELC Clearly Explained</a>: with no partition, you still trade latency against consistency.

**Expected scale (back-of-the-envelope)**
- <a href="https://bytebytego.com/courses/system-design-interview/back-of-the-envelope-estimation" target="_blank" rel="noopener noreferrer">ByteByteGo – Back-of-the-envelope Estimation</a>: worked Twitter example, DAU → QPS → storage.
- <a href="https://system-design.space/en/chapter/back-of-envelope-estimation/" target="_blank" rel="noopener noreferrer">System Design Space – Back-of-Envelope Estimation</a>

**Free deep references and books**
- <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noopener noreferrer">System Design Primer (GitHub)</a>: availability "nines" tables, CAP, consistency patterns, vertical vs horizontal scaling.
- Alex Xu, *System Design Interview Vol. 1*, ch. 2–3: estimation and the interview framework.
- Martin Kleppmann, *Designing Data-Intensive Applications*, ch. 1 (reliability, scalability) and ch. 9 (linearizability, consistency).

---

<img src="../../assets/system-design-cases/url-shortener/1.png"  />
<img src="../../assets/system-design-cases/url-shortener/2.png"  />
<img src="../../assets/system-design-cases/url-shortener/3.png"  />
<img src="../../assets/system-design-cases/url-shortener/4.png"  />
<img src="../../assets/system-design-cases/url-shortener/5.png"  />
<img src="../../assets/system-design-cases/url-shortener/6.png"  />
<img src="../../assets/system-design-cases/url-shortener/7.png"  />
<img src="../../assets/system-design-cases/url-shortener/8.png"  />
<img src="../../assets/system-design-cases/url-shortener/9.png"  />
<img src="../../assets/system-design-cases/url-shortener/10.png"  />
<img src="../../assets/system-design-cases/url-shortener/11.png"  />
<img src="../../assets/system-design-cases/url-shortener/12.png"  />
<img src="../../assets/system-design-cases/url-shortener/13.png"  />
<img src="../../assets/system-design-cases/url-shortener/14.png"  />
<img src="../../assets/system-design-cases/url-shortener/15.png"  />
<img src="../../assets/system-design-cases/url-shortener/16.png"  />
<img src="../../assets/system-design-cases/url-shortener/17.png"  />
<img src="../../assets/system-design-cases/url-shortener/18.png"  />
<img src="../../assets/system-design-cases/url-shortener/19.png"  />
<img src="../../assets/system-design-cases/url-shortener/20.png"  />
<img src="../../assets/system-design-cases/url-shortener/21.png"  />
<img src="../../assets/system-design-cases/url-shortener/22.png"  />
<img src="../../assets/system-design-cases/url-shortener/23.png"  />
<img src="../../assets/system-design-cases/url-shortener/24.png"  />
<img src="../../assets/system-design-cases/url-shortener/25.png"  />
<img src="../../assets/system-design-cases/url-shortener/26.png"  />
<img src="../../assets/system-design-cases/url-shortener/27.png"  />
<img src="../../assets/system-design-cases/url-shortener/28.png"  />
<img src="../../assets/system-design-cases/url-shortener/29.png"  />
<img src="../../assets/system-design-cases/url-shortener/30.png"  />
<img src="../../assets/system-design-cases/url-shortener/31.png"  />
<img src="../../assets/system-design-cases/url-shortener/32.png"  />
<img src="../../assets/system-design-cases/url-shortener/33.png"  />
<img src="../../assets/system-design-cases/url-shortener/34.png"  />
<img src="../../assets/system-design-cases/url-shortener/35.png"  />
<img src="../../assets/system-design-cases/url-shortener/36.png"  />
<img src="../../assets/system-design-cases/url-shortener/37.png"  />


