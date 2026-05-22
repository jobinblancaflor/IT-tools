# Encryption / Decryption Tool

## 1. What the tool does
The Encryption/Decryption tool is a client-side cryptographic utility that allows users to secure text using various symmetric encryption algorithms. Symmetric encryption is a method where the same "secret key" is used for both the encryption of plaintext and the decryption of ciphertext. 

The tool leverages the industry-standard `crypto-js` library to provide a suite of robust algorithms, including **AES (Advanced Encryption Standard)**, **TripleDES**, **Rabbit**, and **RC4**. It provides a simple, two-pane interface: one for transforming readable text into an encrypted string (Base64 encoded), and another for reversing that process to recover the original message.

## 2. Why someone uses it
In an era of ubiquitous data surveillance and frequent data breaches, the ability to quickly and locally encrypt information is invaluable. 

Common reasons for using this tool include:
- **Secure Communication:** Encrypting a message before sending it over an unencrypted channel (like an email or a public chat) so that only the recipient with the secret key can read it.
- **Data Privacy:** Securing sensitive snippets of information (like passwords, personal notes, or API keys) before saving them in a cloud-based note-taking app.
- **Developer Testing:** Verifying the output of cryptographic implementations in their own code. A developer can use this tool as a "source of truth" to check if their AES implementation is producing the expected results.
- **Educational Purposes:** Learning how different encryption algorithms change the resulting ciphertext and understanding the relationship between key length, algorithm choice, and security.
- **Bypassing Simple Filters:** Occasionally used to obfuscate text that might otherwise trigger simplistic automated filters or "spoiler" detectors.

## 3. Step-by-step instructions

### To Encrypt Text:
1.  **Input Plaintext:** Type or paste your sensitive message into the "Your text" field in the Encrypt card.
2.  **Define a Secret Key:** Enter a strong, unique string in the "Your secret key" field. This is the "password" that locks your data.
3.  **Select Algorithm:** Choose an algorithm from the dropdown (AES is recommended for most use cases).
4.  **Retrieve Ciphertext:** The tool immediately generates the encrypted version in the "Your text encrypted" field. You can copy this safely.

### To Decrypt Text:
1.  **Input Ciphertext:** Paste the encrypted string (usually a long block of random-looking characters) into the "Your encrypted text" field in the Decrypt card.
2.  **Enter Secret Key:** Input the *exact* same secret key used during the encryption phase.
3.  **Select Matching Algorithm:** Ensure the algorithm dropdown matches the one used to encrypt the data.
4.  **View Results:** 
    - If the key and algorithm are correct, your original text appears in the "Your decrypted text" field.
    - If they are incorrect, an "Unable to decrypt your text" error message will appear.

## 4. Examples

### AES Encryption (Standard)
- **Plaintext:** `Meet me at the secret spot at midnight.`
- **Secret Key:** `password123`
- **Algorithm:** `AES`
- **Output:** `U2FsdGVkX19iO7Z9... (truncated)`

### TripleDES (Legacy Support)
TripleDES applies the DES algorithm three times to each data block. It is slower than AES and generally considered less secure for modern high-stakes data, but widely used in legacy financial systems.
- **Plaintext:** `Account Balance: $5000`
- **Secret Key:** `bank-key-alpha`
- **Algorithm:** `TripleDES`

## 5. FAQs

**Q: Which algorithm should I choose?**
A: **AES** is the global standard. It is highly secure, efficient, and recommended by security experts worldwide. Use the others only if you have a specific technical requirement or are working with legacy systems.

**Q: Is my secret key sent to your server?**
A: No. All encryption and decryption logic runs entirely within your browser using JavaScript. Your plaintext and secret keys never leave your device.

**Q: Can I recover my text if I lose the secret key?**
A: No. Symmetric encryption is mathematically designed to be impossible to reverse without the key. There are no "backdoors."

**Q: Why does the encrypted output change every time I click, even with the same text and key?**
A: Modern libraries like `crypto-js` often use a "Salt" or "Initialization Vector" (IV). This adds randomness so that encrypting the same word twice results in different ciphertexts, preventing pattern analysis attacks.

## 6. Common mistakes
- **Using Weak Keys:** A secret key like "12345" or "password" can be easily brute-forced. Use a long, complex passphrase.
- **Wrong Algorithm Selection:** Trying to decrypt AES-encrypted text using the TripleDES setting will result in an error.
- **Leading/Trailing Spaces:** Be careful when copying keys. A space at the end of a key makes it a completely different key in the eyes of the algorithm.
- **Confusing Encryption with Hashing:** Encryption is reversible (with a key); Hashing (like SHA-256) is a one-way process. If you need to recover the original text later, use this tool. If you just need to verify a password, use a Hasher.

## 7. Use cases
- **Environment Variables:** Encrypting `.env` file contents before sharing them via Slack or Jira.
- **Personal Journals:** Storing encrypted diary entries in a public GitHub Gist or simple text file.
- **Token Obfuscation:** Safely passing sensitive session data through URL parameters (though this requires careful handling of special characters).
- **Offline Backups:** Encrypting a list of recovery codes before printing them or saving them to a USB drive.

## 9. Technical Deep Dive: Cryptographic Implementation
This tool utilizes the `crypto-js` library, which provides a pure JavaScript implementation of various standard cryptographic algorithms.

### How AES Works (Under the Hood)
AES is a block cipher. It breaks your plaintext into fixed-size blocks (128 bits) and applies multiple rounds of transformation. These transformations include:
1.  **SubBytes:** A non-linear substitution step where each byte is replaced with another according to a lookup table.
2.  **ShiftRows:** A transposition step where the last three rows of the state are shifted cyclically a certain number of steps.
3.  **MixColumns:** A mixing operation which operates on the columns of the state, combining the four bytes in each column.
4.  **AddRoundKey:** Each byte of the state is combined with a block of the round key using bitwise XOR.

The tool handles the conversion of your human-readable "Secret Key" into a formal cryptographic key using a process called **Key Derivation**.

### The Role of Base64
Encrypted data consists of raw bytes, many of which are non-printable or "control" characters. If you tried to copy-paste these raw bytes, they would likely be corrupted by your browser or clipboard. To solve this, the tool encodes the ciphertext into **Base64**. This transforms the binary data into a string of 64 safe, printable characters (A-Z, a-z, 0-9, +, and /).

### Symmetric vs. Asymmetric
It is important to understand that this tool provides **Symmetric Encryption**. 
- **Symmetric:** One key to lock, the same key to unlock. Efficient and fast.
- **Asymmetric (RSA/ECC):** A Public key to lock, a Private key to unlock. Used for things like SSH keys and SSL certificates.
This tool is perfect for personal data storage or pre-shared secret communication, but it is not intended for building a Public Key Infrastructure (PKI).

## 10. Security Best Practices
To ensure your data remains truly secure, follow these guidelines:
1.  **Entropy Matters:** A key like `p@ssword` is slightly better than `password`, but still vulnerable to dictionary attacks. A random phrase like `Correct-Horse-Battery-Staple` is much harder to crack.
2.  **Key Delivery:** Never send the secret key over the same channel as the encrypted message. If you email an encrypted file, send the key via a secure SMS or a different messaging app.
3.  **Browser Security:** Ensure you are using this tool on a trusted device. If your computer has a keylogger or malicious browser extension, your secret key could be captured as you type it.
4.  **No Reuse:** Ideally, use a different secret key for different types of data or different recipients.
