# JWT Parser: The Definitive Guide to Decoding and Debugging JSON Web Tokens

## What the tool does
The **JWT Parser** is a specialized diagnostic utility designed to decode and inspect JSON Web Tokens (JWT) without the need for a private key. It takes an encoded JWT string—typically found in Authorization headers—and breaks it down into its three constituent parts: the Header, the Payload, and the Signature.

Our tool performs a "soft decode," meaning it uses Base64URL decoding to reveal the JSON objects contained within the token. It provides syntax highlighting for the JSON data, identifies the algorithms used (such as HS256 or RS256), and displays the raw signature bytes. This process happens entirely within your browser's memory, ensuring that sensitive token data is never transmitted to our servers.

## Why someone uses it
In modern web development, JWTs are the "currency" of stateless authentication. Because they are encoded and not encrypted, they are often misunderstood. Developers use this parser to:
1. **Verify Claims:** Ensure that the token contains the correct `sub` (subject), `exp` (expiration), and custom roles or permissions required by the application.
2. **Debug Authentication Flows:** If a server returns a 401 Unauthorized error, a developer can parse the token to see if it has already expired or if the issuer (`iss`) is incorrect.
3. **Inspect Algorithms:** Confirm that the token is using the expected cryptographic algorithm, which is critical for preventing "alg: none" attacks.
4. **On-the-fly Inspection:** Quickly check a token's content during manual API testing in tools like Postman or cURL without writing a custom script.

## Step-by-step instructions
1. **Locate your Token:** Obtain the JWT you wish to inspect. This is usually the long string after "Bearer " in your network request headers.
2. **Paste the Token:** Paste the entire string into the input area. The string should contain two dots (`.`) separating the header, payload, and signature.
3. **Automatic Decoding:** The tool will instantly parse the string. You will see the Header (usually red/purple) and the Payload (usually blue/green) rendered as formatted JSON.
4. **Analyze the Payload:** Look for the `exp` claim. Our tool often converts these Unix timestamps into a human-readable format so you can see exactly when the token expires.
5. **Inspect the Header:** Verify the `typ` (Type) is "JWT" and the `alg` matches your server's configuration.
6. **Copy Data:** If you need to use the decoded JSON in your documentation or bug reports, you can copy the formatted output directly.

## Examples
### A Standard HS256 Token
**Input:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

**Decoded Payload:**
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

### An Expired Token
If you paste a token where `exp` is in the past, a high-quality inspection will reveal that the token is no longer valid for authentication, helping you realize why your API requests are failing.

## FAQs
### Does this tool verify the signature?
No. Signature verification requires the **Secret Key** (for HMAC) or the **Public Key** (for RSA/ECDSA). For security reasons, you should *never* paste your private keys into any online tool. This parser is for inspecting the *contents* of the token, not for validating its cryptographic integrity.

### Is my token data safe?
Yes. Our implementation uses client-side JavaScript to perform the decoding. The token never leaves your browser window. You can even use this tool while offline.

### Why do I see gibberish in the signature section?
The signature is a binary hash. When represented as text, it looks like random characters. It is meant to be verified by a server, not read by a human.

### Can I edit the token here?
This tool is a parser (read-only). To generate or edit tokens, you would need a tool that handles signing, which requires your secret keys.

## Common mistakes
1. **Confusing Encoding with Encryption:** JWTs are Base64URL encoded, not encrypted. Anyone who intercepts a JWT can read its contents. Never put passwords, credit card numbers, or sensitive PII (Personally Identifiable Information) in a JWT payload.
2. **Ignoring the 'exp' Claim:** Developers often assume a token is valid without checking if it has expired. Always check the `exp` timestamp when debugging.
3. **Pasting the "Bearer " Prefix:** The parser expects the raw token string. If you include the word "Bearer ", the decoding will fail because it doesn't follow the triple-part dot notation.
4. **Manual Base64 Decoding:** Standard Base64 decoding may fail on JWTs because they use "Base64URL" encoding, which replaces `+` with `-` and `/` with `_`. Our tool handles this specialized format correctly.

## Use cases
- **Backend Development:** Verifying that your token generation logic is correctly embedding user permissions.
- **Frontend Development:** Checking the `exp` claim to trigger a silent refresh or a redirect to the login page before the token actually fails.
- **Security Auditing:** Ensuring that tokens aren't bloated with unnecessary data that increases header size and wastes bandwidth.
- **API Integration:** Inspecting tokens from third-party providers (like Auth0, Okta, or Firebase) to see what user information they provide by default.

## Related tools
- **Bcrypt Tool:** For checking the password hashes that often sit behind the authentication system.
- **Base64 String Converter:** If you need to decode individual parts of a token or other encoded strings.
- **Hmac Generator:** To understand the hashing process that creates a JWT signature.
- **JSON Viewer:** For a deeper look into the decoded payload structure.

---

*Note: This guide is intended for educational and diagnostic purposes. Always follow your organization's security policies when handling authentication tokens.*
