# Bcrypt: Technical Deep Dive for Developers and Sysadmins

Bcrypt is an adaptive, salted password-hashing function based on the Blowfish block cipher. It is specifically engineered to remain secure against brute-force and hardware-accelerated attacks (FPGA/ASIC) by introducing a configurable "cost factor" that slows down the hashing process.

## 1. What the Tool Does
Bcrypt implements a modified version of the Blowfish cipher called **EksBlowfish (Expensive Key Schedule Blowfish)**. Unlike standard hashing algorithms (like SHA-256) which are designed for speed, bcrypt is designed to be computationally expensive.

It transforms a plaintext password into a secure hash by:
- Generating a cryptographically secure random salt.
- Running a key-expansion phase $2^{\\text{cost}}$ times, mixing the password and salt into the internal state (S-boxes and P-array).
- Encrypting a known constant string (`"OrpheanBeholderScryDoubt"`) to produce the final ciphertext.

## 2. Why Someone Uses It
Developers use bcrypt to protect user credentials in the event of a database breach.
- **Resistance to Rainbow Tables:** Each password has a unique salt, meaning the same password will result in different hashes across different accounts.
- **Adaptive Work Factor:** As hardware becomes faster (Moore's Law), developers can increase the `cost` factor to maintain the same time-to-crack without changing the underlying algorithm.
- **CPU-Bound Bottleneck:** Because bcrypt requires significant memory and CPU cycles during its key schedule, it is significantly harder to parallelize on GPUs compared to simple hashes.

## 3. Step-by-Step Instructions

### Implementation Workflow
1. **Registration:**
   - Receive plaintext password from the user.
   - Generate a random 16-byte salt.
   - Set a cost factor (e.g., `12`).
   - Run `bcrypt(password, salt, cost)` $\\rightarrow$ store the resulting string in the database.
2. **Authentication:**
   - Retrieve the stored hash for the user.
   - Extract the salt and cost factor from the hash string (they are encoded in the prefix).
   - Hash the provided plaintext password using the extracted salt and cost.
   - Perform a **constant-time comparison** between the new hash and the stored hash.

### Advanced Usage: Handling the 72-Byte Limit
Bcrypt has a hard limit of 72 bytes for the input password. Any characters beyond this are silently ignored. To support longer passwords without losing entropy:
1. Hash the password with a fast, collision-resistant hash (e.g., `SHA-256`).
2. Pass the resulting binary hash (or its Base64 encoding) into bcrypt.
3. **Warning:** If using this method, ensure you use a consistent encoding to avoid issues with null bytes in the SHA-256 output.

## 4. Examples

### Anatomy of a Bcrypt Hash
`$2b$12$R9h/cIPz0gi.S5S9vT5fL.n6Zp2S9f2z8S7fS0S5S0S5S0S5S0S5S`

- `$2b$`: Algorithm version (identifies the specific bcrypt revision).
- `$12$`: Cost factor ($2^{12} = 4096$ iterations).
- `R9h...`: 22-character Base64 encoded salt.
- `n6Z...`: 31-character Base64 encoded ciphertext (the actual hash).

### Code Example (Conceptual Node.js)
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 12;

// Hashing
const hash = await bcrypt.hash(plaintextPassword, saltRounds);

// Verification (Uses constant-time comparison internally)
const match = await bcrypt.compare(plaintextPassword, hash);
```

## 5. FAQs
**Q: What is the ideal cost factor?**
A: The cost factor should be as high as your server can tolerate without degrading user experience. A common target is a hashing time of ~250ms to 500ms.

**Q: Should I use a separate salt column in my database?**
A: No. Bcrypt encodes the salt and cost factor directly into the resulting hash string, making it self-contained.

**Q: Is bcrypt better than Argon2?**
A: Argon2 is the winner of the Password Hashing Competition and is generally superior because it is memory-hard (resisting GPU/ASIC attacks better than bcrypt). However, bcrypt remains a high-value, industry-standard choice with broader library support.

## 6. Common Mistakes
- **Using `==` for Comparison:** Standard string comparison returns as soon as a mismatch is found. This allows attackers to perform **timing attacks** to guess the hash character-by-character. Always use a constant-time comparison function.
- **Overlooking the 72-Byte Limit:** Not validating password length or pre-hashing long passwords, leading to "collision" where `Password[72 chars]A` and `Password[72 chars]B` are treated as identical.
- **Blocking the Event Loop:** In single-threaded environments (like Node.js), bcrypt's CPU-heavy nature can freeze the entire server. Always use the asynchronous API or offload hashing to worker threads.

## 7. Use Cases (Professional/Industrial)
- **Identity Providers (IdP):** Implementing secure credential storage for OAuth2/OpenID Connect providers.
- **Legacy System Migration:** Upgrading old MD5 or SHA-1 password stores to bcrypt via "hash-on-login" (re-hashing the password when the user successfully authenticates with the old algorithm).
- **High-Security Internal Tools:** Securing administrative access to critical infrastructure where a slow hash is an acceptable trade-off for higher brute-force resistance.

## 8. Related Resources
- **Deep Dive**: Read our comprehensive [Password Hashing Guide](/blogs/password-hashing-guide) to understand why bcrypt is preferred over MD5 and SHA-1.
- **Related Tools**: 
  - [Hash Text](/tools/hash-text): For general purpose hashing.
  - [Encryption](/tools/encryption): For reversible data protection.
- **External Sources**:
  - [6over3/bcrypt GitHub](https://github.com/6over3/bcrypt)
  - [libressl/openbsd bcrypt.c](https://github.com/libressl-portable/openbsd/blob/master/src/lib/libc/crypt/bcrypt.c)
  - [Go crypto/bcrypt source](https://go.googlesource.com/crypto/+/refs/heads/master/bcrypt.go)
  - [BouncyCastle Java BCrypt](https://github.com/bcgit/bc-java/blob/master/core/src/main/java/org/bouncycastle/crypto/generators/BCrypt.java)
  - [node.bcrypt.js source](https://github.com/kelektiv/node.bcrypt.js/blob/master/src/bcrypt.cc)
