# RSA Key Pair Generator

## What it does
The RSA Key Pair Generator is a secure, browser-based utility for creating asymmetrical cryptographic keys. It generates a **Public Key** and a **Private Key** in the standard PEM format. You can customize the strength of the keys by adjusting the bit length, ranging from 256 bits for testing up to 16,384 bits for extreme security.

## Why someone uses it
- **SSH Authentication:** Generating keys to securely log into remote servers without a password.
- **Secure Communication:** Setting up asymmetrical encryption where anyone can use your Public Key to encrypt data that only your Private Key can decrypt.
- **Digital Signatures:** Creating keys to sign software or documents, allowing others to verify that the content hasn't been tampered with.
- **Local Development:** Quickly generating keys for testing HTTPS, JWT signing, or encrypted database connections.

## Step-by-step instructions
1. **Choose Bit Length:** Enter the number of bits in the **Bits** field. The industry standard is **2048**, while **4096** is used for higher security. The value must be a multiple of 8.
2. **Generate Keys:** The tool generates keys automatically. If you want a different set, click **Refresh key-pair**.
3. **Copy Public Key:** Copy the top block of text. This is what you share with others or upload to servers (e.g., your `authorized_keys` file).
4. **Copy Private Key:** Copy the bottom block. **Warning:** Keep this key secret and never share it.

## Examples
- **Standard Web Use:** Set bits to `2048` for a balance of speed and security.
- **Hardened Server Access:** Set bits to `4096` for sensitive infrastructure.
- **Quick Testing:** Set bits to `1024` for fast generation during development (do not use in production).

## FAQs
- **Is this safe to use?** Yes. The keys are generated locally in your browser using the Web Crypto API. Your private key is never transmitted to any server.
- **Which bit length is best?** For most modern applications, **2048 bits** is the recommended minimum. **4096 bits** is more secure but results in slower encryption/decryption operations.
- **What does PEM format mean?** It stands for "Privacy-Enhanced Mail". It is a text-based format that encodes binary cryptographic data into a Base64 string surrounded by header and footer markers.

## Common mistakes
- **Exposing the Private Key:** The most common mistake is accidentally committing your private key to a public repository like GitHub or sharing it in a support ticket.
- **Using Bit Lengths too Low:** Using 512 or 1024 bits for production data, which can be cracked relatively easily by modern hardware.
- **Confusion between Keys:** Using the Private Key where the Public Key is required (e.g., on a public server).

## Use cases
- **GitHub/GitLab Setup:** Creating an SSH key to push code securely.
- **JWT Signing:** Generating the RS256 keys required for signing and verifying JSON Web Tokens.
- **Encryption Tools:** Providing keys for tools that encrypt sensitive files or messages.

## Related tools
- **Encryption:** For encrypting and decrypting text using various algorithms.
- **BIP39 Generator:** For creating secure mnemonic phrases used in cryptocurrency and wallet security.
- **Hash Text:** For generating one-way hashes to verify data integrity.
