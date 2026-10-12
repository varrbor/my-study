# Secure Passwords
- Passwords are the most common form of authentication and the most common way in for attackers
- Strength comes from length and unpredictability, not from clever substitutions
- The three habits that matter most: long, unique per account, plus MFA

## What makes a password strong
- Length: every extra character multiplies the number of possibilities
- Randomness: not a word, name, date, keyboard pattern or anything about you
- Uniqueness: used on one account only
- `P@ssw0rd1!` is weak: predictable patterns are the first thing attackers try

## Length beats complexity

| Password | Possibilities | Entropy |
|----------|---------------|---------|
| 8 lowercase letters | 26^8 ≈ 2 × 10^11 | about 38 bits |
| 8 characters, all types | 94^8 ≈ 6 × 10^15 | about 52 bits |
| 12 characters, all types | 94^12 ≈ 5 × 10^23 | about 79 bits |
| 16 lowercase letters | 26^16 ≈ 4 × 10^22 | about 75 bits |
| 4 random words (7776-word list) | 7776^4 ≈ 4 × 10^15 | about 52 bits |
| 6 random words | 7776^6 ≈ 2 × 10^23 | about 78 bits |

- Entropy: how unpredictable a password is, in bits; each bit doubles the guessing work
- These numbers hold only if the characters or words are chosen at random
- Passphrase: several random words, e.g. `correct horse battery staple`; long, and easier to remember and type

## How passwords are attacked

| Attack | How | Defence |
|--------|-----|---------|
| Brute force | tries every combination | length |
| Dictionary | tries word lists and common passwords with variations | randomness |
| Credential stuffing | reuses usernames and passwords leaked from another site | unique passwords |
| Password spraying | tries a few common passwords against many accounts | no common passwords, lockout, MFA |
| Phishing | tricks the user into typing it on a fake site | MFA, password manager, training |
| Keylogger / malware | records what is typed | endpoint protection, MFA |
| Shoulder surfing | watching the user type | awareness |
| Rainbow tables | precomputed hash lookups | salted hashes |
| Sniffing | reading it from unencrypted traffic | TLS, SSH |

- Online attack: guessing against the live login; slowed by lockout and rate limiting
- Offline attack: guessing against stolen hashes at billions of tries per second; only length and a slow hash help

## Good practice for users
- Use a password manager: it generates and remembers a long random password per account
- Protect the manager with one strong passphrase and MFA
- Never reuse a password across accounts
- Turn on MFA wherever it is offered
- Change a password when there is a sign of compromise, not on a calendar
- Check for breaches (e.g. Have I Been Pwned)
- Do not share passwords, write them on notes, or send them by email or chat
- Change default passwords on routers, cameras and other devices

## Multi-factor authentication (MFA)

| Method | Strength |
|--------|----------|
| SMS or voice code | better than nothing; vulnerable to SIM swapping |
| Authenticator app (TOTP) | good |
| Push notification | good; beware of approving prompts you did not start |
| Hardware security key (FIDO2) | best, resists phishing |
| Passkey | replaces the password with a key pair on your device, resists phishing |

- A stolen password alone is then not enough to log in

## Current guidance (NIST SP 800-63B)
- Favour length; allow long passphrases and all characters, including spaces
- No forced complexity rules (must contain upper, digit, symbol)
- No periodic forced changes; change only on evidence of compromise
- Check new passwords against lists of common and breached passwords
- Allow pasting, so password managers work
- No password hints or security questions
- Limit failed attempts

## Storing passwords (for systems)
- Never store or log passwords in plain text, and never encrypt them reversibly
- Store a salted hash made with a slow password-hashing function

| Use | Avoid |
|-----|-------|
| Argon2id, bcrypt, scrypt, PBKDF2 | MD5, SHA-1, plain SHA-256 (too fast) |

- Hash: one-way function; the system compares hashes, it never needs the password itself
- Salt: a random value per user, added before hashing, so identical passwords get different hashes and rainbow tables are useless
- Slow, tunable hashing makes each offline guess expensive
- Always send passwords over an encrypted connection (TLS)

## Password policy for an organization
- Minimum length (12–16 or more), no upper limit that blocks passphrases
- Block common and breached passwords
- Account lockout or increasing delays after failed attempts
- MFA for remote access, email and administrators
- Separate administrator accounts; no shared accounts
- Privileged and service account passwords in a vault, rotated
- Disable accounts promptly when people leave

## On network devices
- Change default credentials before connecting the device
- Use SSH and HTTPS for management, never Telnet or HTTP
- Cisco: `enable secret` (hashed) rather than `enable password`; `service password-encryption` is only weak obfuscation
- Prefer central authentication (RADIUS / TACACS+) to local accounts
- Wi-Fi: a long WPA2/WPA3 passphrase, changed when someone with access leaves

https://pages.nist.gov/800-63-3/sp800-63b.html

https://en.wikipedia.org/wiki/Password_strength
