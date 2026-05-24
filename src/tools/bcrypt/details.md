# Bcrypt: The Industry Standard for Secure Password Hashing

## What the tool does
The **Bcrypt Tool** is a high-security cryptographic utility designed to provide a user-friendly interface for the **Bcrypt password hashing function**. Based on the **Blowfish cipher**, Bcrypt is not a simple hash like MD5 or SHA-256; it is an "adaptive" hashing algorithm that incorporates a salt to protect against rainbow table attacks and a "work factor" to slow down brute-force attempts.

Our tool enables three primary security workflows:
1.  **Secure Hash Generation:** Transform a plain-text password into a collision-resistant, salted hash.
2.  **Interactive Verification:** Compare a previously generated Bcrypt hash against a plain-text input to verify a match, simulating a backend login process.
3.  **Cost Factor Calibration:** Adjust the "rounds" (logarithmic cost) to see how it impact generation time, helping developers find the perfect balance between security and server performance.

The resulting hashes follow the standardized modular format (e.g., `$2b$12$S.Vl...`), which encodes the algorithm version, the cost factor, the salt, and the checksum in a single string.

## Why someone uses it
In modern cybersecurity, storing passwords in plain text is a catastrophic failure. Even "fast" hashing algorithms are now considered dangerous for password storage because specialized hardware can crack them in seconds.

Developers choose Bcrypt for several critical reasons:
*   **Defense Against GPU/ASIC Attacks:** Algorithms like SHA-256 are designed to be fast, which is great for file integrity but terrible for passwords. Attackers use GPUs to calculate billions of SHA hashes per second. Bcrypt is intentionally slow and memory-intensive, neutralizing this advantage.
*   **Automatic Salting:** Every Bcrypt hash contains a 128-bit random salt. This ensures that even if two users have the same password (like `password123`), their hashes in the database will be completely different. This makes pre-computed "Rainbow Tables" useless.
*   **The "Work Factor" (Adaptive Security):** As hardware speeds increase over time (Moore's Law), you can simply increase the "cost" parameter. This doubles the time required to compute the hash, allowing you to maintain the same level of security without changing your code or database schema.
*   **Mature and Battle-Tested:** Since its introduction at USENIX in 1999 by Niels Provos and David Mazières, Bcrypt has remained the industry gold standard. It has survived decades of cryptographic scrutiny without a major break.
*   **Cross-Platform Ubiquity:** Whether you are using Node.js (`bcryptjs`), Python (`passlib`), Ruby, or Go, there is a high-quality, native implementation of Bcrypt available.

## Step-by-step instructions
### Hashing a Password
1.  **Enter Your Secret:** Type the password or string into the "Text to hash" field.
2.  **Set the Rounds:** Choose a cost factor between 10 and 14. 
    *   **10:** Suitable for fast, high-traffic user logins.
    *   **12:** The current industry recommendation for balanced security.
    *   **14+:** Used for highly sensitive administrative accounts.
3.  **Generate:** The tool will output a string starting with `$2b$`. Note that clicking "Generate" multiple times with the same password will result in different hashes—this is the salting mechanism at work.
4.  **Copy:** Save the hash to your database "password" column.

### Verifying a Match
1.  **Input the Known Hash:** Paste the full `$2x$...` string from your storage into the "Hash to check" field.
2.  **Input the Password:** Type the plain-text password provided by the user.
3.  **Analyze the Result:** The tool will provide a cryptographic confirmation. It extracts the salt and cost from the hash string, re-hashes the input password with those exact parameters, and checks if the results match.

## Examples
### Example 1: Standard User Password
**Input:** `hunter2`
**Cost:** 10
**Result:** `$2b$10$R9h/lS7PNPWm.Yd9Rz3UeuNf8F...`
This hash is ideal for a standard web application. It takes roughly 100ms to verify on a modern server.

### Example 2: Administrative Account
**Input:** `Very-Long-And-Secure-Phrase-2024`
**Cost:** 13
**Result:** `$2b$13$X7k...`
By increasing the cost to 13, we make the hashing process 8 times slower ($2^{13} / 2^{10}$) than Example 1, providing significantly more protection for high-value targets.

### Example 3: Legacy PHP Compatibility
**Hash:** `$2y$10$...`
The `$2y$` prefix is a variant used in PHP to handle specific issues with non-ASCII characters. Our tool is fully compatible with `$2a$`, `$2b$`, and `$2y$` variants.

## FAQs
### What is the "Eksblowfish" algorithm?
Bcrypt is based on a variant of the Blowfish block cipher called **Eksblowfish** (Expensive Key Setup Blowfish). Unlike standard Blowfish, which has a fixed key setup, Eksblowfish makes the key setup phase dependent on both the salt and the password, and it repeats this setup thousands of times (controlled by the cost factor).

### Why does Bcrypt have a 72-character limit?
The Blowfish algorithm uses a 448-bit key. In the Bcrypt implementation, the password is used to initialize the state of the cipher. Most libraries truncate the password at 72 bytes. 
*   **Pro Tip:** If you need to support longer passwords, hash the password with SHA-256 first and then pass the *resulting hash* to Bcrypt.

### Is Argon2 better than Bcrypt?
**Argon2** is the winner of the Password Hashing Competition (PHC) and is technically superior because it is "memory-hard," meaning it's even harder to crack with specialized hardware. However, Bcrypt remains perfectly secure for 99% of applications and is often easier to implement.

### Can I "decrypt" a Bcrypt hash?
No. Bcrypt is a **one-way function**. It is mathematically impossible to turn the hash back into the original password. Verification is only possible by re-hashing a known input and comparing the output.

### How many rounds should I use?
A good rule of thumb is that a login should take between 200ms and 500ms. If it's faster than 100ms, it's too easy to crack. If it's slower than 1 second, it creates a "Denial of Service" risk where an attacker can overwhelm your CPU by making many login requests.

## Common mistakes
*   **Low Cost Factor:** Using a cost of 4 or 5 is dangerously fast. It offers almost no protection against modern password-cracking rigs.
*   **Manual String Comparison:** Never use `if (storedHash == generatedHash)`. Because of the salt, they will never be equal. You must use the `checkPassword` or `verify` function provided by your library.
*   **Double Salting:** Some developers try to add their own salt *before* passing the password to Bcrypt. This is unnecessary and can actually weaken the security by reducing the entropy of the input.
*   **Ignoring the Prefix:** Accidentally stripping the `$2b$12$` part of the string. Without this metadata, the verification function won't know which algorithm or cost factor to use.
*   **Storing in a Small Column:** Ensure your database column is at least 60 characters long (the standard length of a Bcrypt hash).

## Use cases
*   **User Authentication:** The primary method for storing passwords in web applications, CMS platforms, and internal tools.
*   **API Key Hashing:** Instead of storing API keys in plain text, store their Bcrypt hashes. When the client sends the key in a header, hash it and compare.
*   **Security Audits:** Verifying that a legacy system's "hashed" passwords are using a secure algorithm and an appropriate cost factor.
*   **Development Seeding:** Generating a known hash to insert into a local database so you can log in as a test user during development.
*   **Educational Demonstrations:** Showing students and junior developers why salting and work factors are essential for modern security.

## Related tools
*   **JWT Parser:** To inspect the tokens often issued after a successful Bcrypt login.
*   **Password Strength Analyser:** To help users create strong passwords *before* you hash them with Bcrypt.
*   **Token Generator:** For creating the random "secret keys" used to sign the tokens that Bcrypt-protected accounts use.
*   **URL Shortener:** To manage the long links often sent in "Password Reset" emails.
*   **IP Address Lookup:** To track and block "Brute Force" attempts on your login endpoints.
