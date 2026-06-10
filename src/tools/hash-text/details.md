# hash-text

The `hash-text` tool is a professional-grade cryptographic hashing utility designed for developers and system administrators to generate one-way digests of arbitrary text strings using a variety of industry-standard algorithms.

## 1. What the tool does
The tool computes cryptographic hashes of a provided input string. Unlike encryption, hashing is a one-way process; it transforms an input of any size into a fixed-size string of characters (the digest), which cannot be reversed to reveal the original text.

It supports multiple cryptographic standards and allows the output to be encoded in several formats, ensuring compatibility with different database schemas, API requirements, and low-level system configurations.

## 2. Why someone uses it
Developers and sysadmins use `hash-text` for:
- **Integrity Verification**: Generating a checksum of a configuration file or a string to ensure it hasn't been tampered with.
- **Password Hashing Prototypes**: Testing how different hashing algorithms affect string representation before implementing them in code.
- **API Integration**: Generating hashes required for HMAC signatures or third-party API authentication.
- **Data Masking**: Creating deterministic identifiers for sensitive data (pseudonymization) where the original value must not be stored.
- **Comparing Binary/Hex Representations**: Quickly toggling between Hex, Base64, and Binary to debug encoding mismatches between different platforms (e.g., a Java backend vs. a JavaScript frontend).

## 3. Step-by-step instructions
1. **Input Text**: Enter the string you wish to hash into the "Your text to hash" multiline input field. The tool supports raw text, including newlines and special characters.
2. **Select Digest Encoding**: Choose the desired output format from the "Digest encoding" dropdown:
   - **Hexadecimal**: The standard representation (base 16).
   - **Base64 / Base64url**: Compact binary-to-text encoding.
   - **Binary**: A raw base 2 representation (0s and 1s).
3. **Identify the Algorithm**: The tool simultaneously computes hashes for all supported algorithms. Locate the specific algorithm you need (e.g., `SHA256` or `MD5`) in the resulting list.
4. **Copy Result**: Use the copyable input field next to the algorithm name to grab the digest for use in your project.

## 4. Examples
### Case A: API Signature Generation
- **Input**: `api_key=12345&timestamp=1625000000`
- **Encoding**: `Hex`
- **Target**: `SHA256`
- **Result**: `f5a... (64 character hex string)`

### Case B: Binary Comparison
- **Input**: `Hello World`
- **Encoding**: `Bin`
- **Target**: `MD5`
- **Result**: `0100... (128 bits of binary data)`

### Case C: URL-Safe Identifier
- **Input**: `user_session_98765`
- **Encoding**: `Base64url`
- **Target**: `SHA1`
- **Result**: `qS1... (URL-safe base64 string)`

## 5. FAQs
**Q: Is this tool suitable for hashing production passwords?**
**A:** No. This tool provides *primitive* hashes. Production passwords should be hashed using "slow" algorithms like Argon2, bcrypt, or scrypt with a unique salt to prevent rainbow table and brute-force attacks.

**Q: What is the difference between Base64 and Base64url?**
**A:** Base64url replaces `+` with `-` and `/` with `_`, and typically omits padding (`=`), making the resulting string safe for use in URLs and filenames without percent-encoding.

**Q: Why does the Binary encoding show 0s and 1s?**
**A:** It converts the hexadecimal digest into its direct bit-level representation, which is useful for analyzing bit-flips or implementing custom bit-wise logic.

## 6. Common mistakes
- **Confusing Hashing with Encryption**: Attempting to "decrypt" a hash. Hashes are one-way; they cannot be decrypted.
- **Ignoring Encoding**: Copying a Base64 hash into a field that expects Hexadecimal, leading to "Invalid Hash" errors in the target system.
- **Using MD5 for Security**: Using `MD5` or `SHA1` for sensitive security features. These algorithms are cryptographically broken (collision attacks) and should only be used for non-security checksums.
- **Trailing Newlines**: Accidentally including a newline character at the end of the input text, which completely changes the resulting hash.

## 7. Use cases (Professional/Industrial)
- **DevOps/SRE**: Generating a SHA-256 hash of a deployment manifest to verify that the exact same version of a config is deployed across multiple Kubernetes clusters.
- **Security Auditing**: Comparing a known-good hash of a system binary (like `/bin/ls`) against the current system's binary hash to detect rootkits or unauthorized modifications.
- **Software Engineering**: Implementing a "Content-Addressable Storage" system where files are stored based on the hash of their content rather than their filename.
- **Database Administration**: Creating a unique hash of a long composite key (e.g., a combination of several columns) to create a more efficient primary index.

## 8. Related tools
- **HMAC Generators**: Tools that combine a secret key with a hash function.
- **Base64 Encoders/Decoders**: For general-purpose binary-to-text transformation without hashing.
- **Checksum Verifiers**: Tools specifically for verifying `.iso` or `.zip` file integrity.
- **Salt Generators**: Tools to create cryptographically strong random strings to be prepended to passwords before hashing.
