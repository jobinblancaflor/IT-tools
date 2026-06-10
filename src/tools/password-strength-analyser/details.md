# Password Strength Analyser

The Password Strength Analyser is a technical utility designed to quantify the cryptographic strength of a password by calculating its entropy and estimating the time required to break it via a brute-force attack. Unlike basic strength meters that rely on arbitrary "complexity rules," this tool uses information theory to provide a mathematical estimation of security.

## 1. What the Tool Does
The tool performs a real-time analysis of a password string to determine its resistance to brute-force guessing. It calculates:
- **Character Set Size ($L$):** Identifies the pool of characters used (lowercase, uppercase, digits, and special characters) to determine the base of the entropy calculation.
- **Information Entropy ($H$):** Calculates the total bits of entropy using the formula: $H = \\log_2(L) \\times \\text{length}$.
- **Time-to-Crack Estimation:** Estimates the duration required to exhaust the entire keyspace, assuming a default attack speed of $10^9$ (1 billion) guesses per second.
- **Strength Score:** Normalizes the entropy against a 128-bit benchmark (the standard for "strong" security) to provide a percentage-based score.

## 2. Why Someone Uses It
Developers and system administrators use this tool to:
- **Validate Password Policies:** Move beyond "at least one uppercase letter" requirements to ensure passwords meet a minimum entropy threshold (e.g., $\\ge 64$ bits).
- **Educate Users:** Provide tangible evidence (e.g., "This password would take 12 centuries to crack") to encourage the use of longer passphrases.
- **Benchmark Security:** Compare the theoretical strength of different password generation strategies (e.g., random alphanumeric vs. dice-rolled passphrases).

## 3. Step-by-Step Instructions
1. **Input Password:** Enter the target string into the password input field.
2. **Observe Real-time Analysis:** The tool updates the analysis as you type.
3. **Review Crack Duration:** Look at the primary card to see the estimated time a brute-force attack would take.
4. **Analyze Technical Metrics:** 
   - Check **Entropy** to see the total bits of randomness.
   - Check **Character Set Size** to see which character classes were detected.
   - Check the **Score** to see how the password compares to the 128-bit security standard.

## 4. Examples
| Password | Charset Size | Entropy | Crack Duration (est.) | Score |
| :--- | :--- | :--- | :--- | :--- |
| `password123` | 36 (L, D) | $\\approx 51.6$ bits | $\\approx 1.2$ days | $40/100$ |
| `P@ssw0rd2024!` | 94 (L, U, D, S) | $\\approx 77.2$ bits | $\\approx 11,000$ years | $60/100$ |
| `CorrectHorseBatteryStaple` | 52 (L, U) | $\\approx 134.4$ bits | $\\approx 300$ quadrillion years | $100/100$ |

## 5. FAQs
**Q: Why is the crack time so high for long passwords?**
A: Brute-force complexity grows exponentially. Adding just one character to a password doesn't add a linear amount of time; it multiplies the total time by the size of the character set.

**Q: Does this tool check against leaked passwords?**
A: No. This is an entropy calculator. It measures theoretical strength, not whether the password has appeared in a known data breach (e.g., via HaveIBeenPwned).

**Q: What is the "128-bit" benchmark?**
A: 128 bits of entropy is generally considered computationally infeasible to crack with current technology, making it a common target for high-security applications.

## 6. Common Mistakes
- **Confusing Complexity with Entropy:** A password like `P@ss1!` looks "complex" but has very low entropy ($\\approx 30$ bits) and can be cracked in milliseconds. Long, simple passphrases (e.g., `correct-horse-battery-staple`) are mathematically stronger.
- **Ignoring Dictionary Attacks:** This tool calculates **brute-force** time (trying every possible combination). It does **not** account for dictionary attacks, where attackers try common words and variations first. A password like `Password123!` has high theoretical entropy but is cracked instantly by dictionary tools.
- **Overestimating "Special Characters":** Users often think adding one `!` makes a password "strong." In reality, increasing the length is far more effective than adding a single special character.

## 7. Use Cases (Professional/Industrial)
- **IAM Policy Auditing:** Sysadmins can use the tool to determine if their current corporate password policy (e.g., 8 characters, mixed case) is actually providing sufficient security.
- **Authentication UI Integration:** Developers can integrate the logic from `password-strength-analyser.service.ts` into a registration flow to prevent users from choosing passwords with $< 40$ bits of entropy.
- **Security Training:** Using the tool during "Security Awareness" sessions to demonstrate the massive difference in crack-time between a 8-character and a 16-character password.

## 8. Related Tools
- **zxcvbn:** A more advanced library that uses dictionary-based pattern matching and frequency analysis.
- **Hashcat / John the Ripper:** The actual tools used by penetration testers to perform the brute-force and dictionary attacks this tool estimates.
- **KeePassXC / Bitwarden:** Password managers that typically include entropy-based strength meters during password generation.
