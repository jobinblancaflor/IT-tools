# Encryption Tool: Technical Reference and Implementation Guide

## 1. What the Tool Does
The encryption tool provides a programmatic interface for securing data at rest and in transit using industry-standard cryptographic primitives. Unlike basic encoding (like Base64), this tool implements **Authenticated Encryption with Associated Data (AEAD)**, ensuring not only confidentiality (secrecy) but also integrity (detecting unauthorized modifications) and authenticity (verifying the sender).

It abstracts the complexities of initialization vectors (IVs), salt generation, and padding, providing a high-level API for symmetric and asymmetric operations while maintaining strict adherence to cryptographic best practices.

## 2. Why Someone Uses It
Developers and sysadmins use this tool to mitigate risks associated with data breaches and unauthorized access. Specific drivers include:
- **Regulatory Compliance:** Meeting standards such as GDPR, HIPAA, or PCI-DSS that mandate encryption of PII (Personally Identifiable Information).
- **Zero-Trust Architecture:** Ensuring that the storage layer (database/cloud bucket) cannot read the data it stores.
- **Secure Secret Management:** Encrypting API keys, database credentials, and environment variables before committing them to version control or storing them in configuration files.
- **Integrity Verification:** Using AEAD to ensure that a configuration file or binary has not been tampered with by a malicious actor.

## 3. Step-by-Step Instructions

### Basic Symmetric Encryption (AES-256-GCM)
1. **Key Generation:** Generate a cryptographically strong 256-bit key using a CSPRNG (Cryptographically Secure Pseudo-Random Number Generator).
2. **Initialization:** Pass the plaintext and the key to the `encrypt` method.
3. **Nonse/IV Handling:** The tool automatically generates a unique 12-byte nonce for every operation. **Never reuse a nonce with the same key.**
4. **Output Capture:** The tool returns a combined payload containing the `nonce + ciphertext + auth_tag`.
5. **Decryption:** Pass the combined payload and the key to the `decrypt` method. The tool splits the payload, verifies the auth tag, and returns the plaintext.

### Advanced Usage: Envelope Encryption
For industrial-scale systems, avoid using a single master key.
1. **Data Encryption Key (DEK):** Generate a random symmetric key to encrypt the specific data object.
2. **Key Encryption Key (KEK):** Use a master key (stored in a Hardware Security Module or KMS) to encrypt the DEK.
3. **Storage:** Store the encrypted data and the encrypted DEK together.
4. **Retrieval:** Request the KMS to decrypt the DEK using the KEK, then use the decrypted DEK to unlock the data.

## 4. Examples

### Symmetric Encryption (Node.js/TypeScript Example)
```typescript
import { EncryptionTool } from '@it-tool/encryption';

const key = EncryptionTool.generateKey(); // 32 bytes for AES-256
const plaintext = "Sensitive System Configuration";

// Encrypt
const encryptedData = EncryptionTool.encrypt(plaintext, key); 
// Result: base64(nonce + ciphertext + tag)

// Decrypt
const decrypted = EncryptionTool.decrypt(encryptedData, key);
console.log(decrypted); // "Sensitive System Configuration"
```

### Asymmetric Key Exchange (RSA/ECC)
```typescript
// Generate Public/Private pair
const { publicKey, privateKey } = EncryptionTool.generateAsymmetricPair('RSA-4096');

// Encrypt with Public Key (Only Private Key can decrypt)
const secret = EncryptionTool.asymmetricEncrypt("AdminPassword123", publicKey);

// Decrypt with Private Key
const original = EncryptionTool.asymmetricDecrypt(secret, privateKey);
```

## 5. FAQs
**Q: Why can't I just use a password as the key?**
A: Passwords have low entropy. You must pass passwords through a Key Derivation Function (KDF) like **Argon2** or **PBKDF2** with a random salt to produce a key suitable for AES.

**Q: What is the difference between AES-CBC and AES-GCM?**
A: CBC (Cipher Block Chaining) provides only confidentiality and requires separate HMAC for integrity. GCM (Galois/Counter Mode) is an AEAD mode that provides both confidentiality and integrity in one pass and is generally faster and more secure.

**Q: How often should I rotate my keys?**
A: Key rotation schedules depend on the volume of data encrypted. Once a key has encrypted $2^{32}$ blocks (in GCM), the probability of nonce collision increases. Implement annual rotation or event-based rotation (e.g., employee offboarding).

## 6. Common Mistakes
- **Hardcoding Keys:** Placing keys in source code. Use environment variables or a secret manager (AWS Secrets Manager, HashiCorp Vault).
- **Nonce Reuse:** Using a static IV/Nonce. In GCM, reusing a nonce with the same key allows an attacker to recover the authentication key and potentially the plaintext.
- **Using Outdated Algorithms:** Using DES, 3DES, or AES-ECB. ECB mode reveals patterns in plaintext (the "Tux" image problem).
- **Ignoring Auth Tags:** In symmetric decryption, failing to verify the authentication tag before processing the plaintext leads to padding oracle attacks.

## 7. Use Cases (Professional/Industrial)
- **Database Field-Level Encryption:** Encrypting only the `email` and `phone_number` columns in a SQL database to minimize the blast radius of a DB dump.
- **Secure Log Masking:** Encrypting sensitive identifiers in application logs so they can be audited by authorized security personnel but remain opaque to general developers.
- **Secure Firmware Updates:** Signing firmware binaries with a private key and verifying the signature on the device using the corresponding public key to prevent malicious updates.
- **Cross-Service Communication:** Implementing a shared-secret rotation mechanism for internal microservices using a centralized KMS.

## 8. Related Resources
- **Deep Dive**: Read our guide on [Cyber Encryption Standards](/blogs/cyber-encryption-standards) to understand the mathematical foundations of AES and RSA.
- **Related Tools**: 
  - [Bcrypt](/tools/bcrypt): For one-way password hashing.
  - [RSA Key Pair Generator](/tools/rsa-key-pair-generator): For asymmetric key management.
- **External Sources**:
  - [NIST Cryptographic Standards](https://csrc.nist.gov/): The official authority on approved encryption algorithms.
  - [RFC 5284 (AES-GCM)](https://datatracker.ietf.org/doc/html/rfc5284): Technical specification for the GCM mode.
