# OTP Code Generator and Validator

## What it does
The OTP Code Generator and Validator is a comprehensive tool for working with One-Time Passwords (OTP). It allows you to generate and verify codes compatible with popular Two-Factor Authentication (2FA) apps like Google Authenticator, Microsoft Authenticator, and Authy. The tool supports both **TOTP** (Time-based One-Time Password, RFC 6238) and **HOTP** (HMAC-based One-Time Password, RFC 4226).

## Why someone uses it
-   **Development & Testing:** Developers use it to test their 2FA implementation without needing a physical device.
-   **Account Recovery:** If you have saved your 2FA secret key, you can use this tool to generate a code if you lose access to your phone.
-   **Security Auditing:** To verify that an implementation correctly follows the RFC standards for TOTP or HOTP.
-   **Learning:** To understand the underlying mechanics of how 2FA codes are generated from a secret key and time/counter.

## Step-by-step instructions
1.  **Select Algorithm:** Choose between **TOTP** (Time-based, most common) or **HOTP** (Counter-based).
2.  **Generate or Enter Secret:** Either click the "Generate" button to create a new random Base32 secret or paste your existing secret into the "Secret Key" field.
3.  **Configure Parameters:**
    *   For **TOTP**: You can usually leave the default (30s period, SHA1).
    *   For **HOTP**: Ensure the "Counter" value matches your current state.
4.  **View Token:** The 6-digit code will appear instantly. For TOTP, it will automatically refresh as time passes.
5.  **Verify a Token:** To check if a code is valid, enter it into the "Verify" field. The tool will check it against the current secret and time/counter.

## Examples
-   **Standard TOTP:** Secret `JBSWY3DPEHPK3PXP` will generate a code that changes every 30 seconds.
-   **HOTP at Counter 5:** Using the same secret with counter 5 will produce a specific, static code until the counter is incremented.
-   **Provisioning URI:** The tool generates a URI like `otpauth://totp/IT-Tools:demo?secret=...` which can be converted into a QR code for easy scanning.

## FAQs
-   **Is my secret key safe?** Yes. All calculations are performed locally in your browser using JavaScript. Your secret key is never sent to any server.
-   **Why doesn't my code match?** For TOTP, the most common reason is that your device's time is out of sync. For HOTP, ensure the counter value is exactly the same as the one expected by the server.
-   **What is Base32?** Secrets for 2FA apps are typically encoded in Base32, which uses only the characters A-Z and 2-7 to avoid visual confusion (like '0' and 'O').
-   **Does it support SHA256 or SHA512?** While SHA1 is the standard for most 2FA apps, the underlying service supports other algorithms if configured.

## Common mistakes
-   **Time Drift:** TOTP is extremely sensitive to time. Even a drift of 30-60 seconds can cause codes to be rejected.
-   **Ignoring the Counter:** In HOTP, forgetting to increment the counter after a successful login will lead to subsequent failures.
-   **Copy-Pasting Whitespace:** Ensure no extra spaces are included when pasting your secret key.

## Use cases
-   **Building 2FA Systems:** Verifying that your backend is generating the same codes as a reference implementation.
-   **Bypassing Physical Devices:** Using the tool in automated testing environments where physical phones cannot be used.
-   **Manual Secret Management:** Storing secrets in a secure vault and using this tool to generate codes as needed.

## Related tools
-   **Token Generator:** Useful for creating custom random secrets.
-   **QR Code Generator:** Convert the generated `otpauth://` URI into a scannable QR code.
-   **HMAC Generator:** To understand the underlying cryptographic process used by HOTP.
