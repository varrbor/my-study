# Capacity Estimation: Summary

After the requirements, put numbers on the scale. These figures decide the throughput, bandwidth and storage the design has to handle.

📄 <a href="../../assets/capasity-estimation/CheatSheet.pdf" target="_blank" rel="noopener noreferrer">Capacity Estimation Cheat Sheet (PDF)</a>

## 1. Inputs: Quantify Expected Scale

| Input | Meaning |
|---|---|
| **DAU / MAU** | Daily or monthly active users. The key scale metric. |
| **Peak active users** | Global events push traffic to some multiple (x) of the average DAU, e.g. Todoo before Christmas. A good design handles peaks. |
| **Activities per user** | Estimate one kind of interaction (read *or* write) for the core features only. |
| **Read/write ratio** | Reads to writes. 10:1 means one write for every 10 reads. Gives you the missing side. |
| **Request size** | Payload per request. Turns request counts into bandwidth and storage. |
| **Replication factor** | Copies of each piece of data across DB nodes. Adds read scalability and redundancy, but multiplies storage. |

## 2. Outputs: Figures of Interest

**Throughput (requests per second)**
- RPD = DAU × activities per user
- RPS = RPD / 10⁵ (86,400 s/day rounded)
- Scale info is often incomplete, so derive the missing side from the ratio:
  - write RPS = read RPS / ratio
  - read RPS = write RPS × ratio
  - total RPS = read RPS + write RPS
- You need write RPS for the storage estimate.

**Bandwidth**
- The amount of data that can be sent between two nodes in a fixed period of time.
- Bandwidth ≈ RPS × request size.
- To keep latency low: provide enough server-side bandwidth and fit request sizes to the bandwidth that's available.
- YouTube doesn't push 4K through slow connections. It adjusts quality to the bandwidth, which keeps buffering to a minimum.

**Storage**
- Storage per second = write RPS × request size × replication factor
- **Storage in 5 years** = storage per second × 10⁵ × 365 × 5. Assume today's user base.

## 3. Estimation Techniques

**1. Simplify whenever you can.** Back-of-the-envelope means simple math under tight time pressure.
- Simple assumptions: 1 char = 1 byte (ASCII), average image ≈ 200 KB, streaming video ≈ 50 MB/min.
- Round heavily: 86,400 s/day → 10⁵. Exact numbers are hard to compute and add little value.
- Conversions you always do: per day → per second, per second → 5 years, bytes → MB / GB.

**File size cheat sheet**

| Type | Low | Medium | High | Very high |
|---|---|---|---|---|
| Image | 10 KB (thumbnail) | 100 KB (website photo) | 2 MB (phone photo) | 20 MB (RAW) |
| Video | 30 MB (480p) | 50 MB (1080p) | 500 MB (4K) | — |
| Audio | 700 KB (low-quality MP3) | — | 3 MB (high-quality MP3) | — |

**2. Convert to scientific notation.**
- Multiply: 10⁹ × 10⁵ = 10¹⁴ (add exponents). Divide: 10⁹ / 10⁵ = 10⁴ (subtract exponents).
- Example: 400 M DAU, 25% upload, 10 files each, 5 MB per file:
  `(4×10⁸) × 0.25 × 10¹ × (5×10⁶) = (4 × 0.25 × 5) × 10⁽⁸⁺¹⁺⁶⁾ = 5×10¹⁵ B ≈ 5 PB/day`

## Resources

- <a href="https://bytebytego.com/courses/system-design-interview/back-of-the-envelope-estimation" target="_blank" rel="noopener noreferrer">ByteByteGo – Back-of-the-envelope Estimation</a>: worked Twitter example, DAU → QPS → storage.
- <a href="https://system-design.space/en/chapter/back-of-envelope-estimation/" target="_blank" rel="noopener noreferrer">System Design Space – Back-of-Envelope Estimation</a>
- <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noopener noreferrer">System Design Primer (GitHub)</a>: powers-of-two table, latency numbers every programmer should know.
- Alex Xu, *System Design Interview Vol. 1*, ch. 2: back-of-the-envelope estimation.

---

<img src="../../assets/capasity-estimation/1.png"  />
<img src="../../assets/capasity-estimation/2.png"  />
<img src="../../assets/capasity-estimation/3.png"  />
<img src="../../assets/capasity-estimation/4.png"  />
<img src="../../assets/capasity-estimation/5.png"  />
<img src="../../assets/capasity-estimation/6.png"  />
<img src="../../assets/capasity-estimation/7.png"  />
<img src="../../assets/capasity-estimation/8.png"  />
<img src="../../assets/capasity-estimation/9.png"  />
<img src="../../assets/capasity-estimation/10.png"  />
<img src="../../assets/capasity-estimation/11.png"  />
<img src="../../assets/capasity-estimation/12.png"  />
<img src="../../assets/capasity-estimation/13.png"  />
<img src="../../assets/capasity-estimation/14.png"  />
<img src="../../assets/capasity-estimation/15.png"  />
<img src="../../assets/capasity-estimation/16.png"  />
<img src="../../assets/capasity-estimation/17.png"  />
<img src="../../assets/capasity-estimation/18.png"  />
<img src="../../assets/capasity-estimation/19.png"  />
<img src="../../assets/capasity-estimation/20.png"  />
<img src="../../assets/capasity-estimation/21.png"  />
<img src="../../assets/capasity-estimation/22.png"  />
<img src="../../assets/capasity-estimation/23.png"  />
<img src="../../assets/capasity-estimation/24.png"  />
