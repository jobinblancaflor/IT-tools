# JWT Parser: Decode and Inspect JSON Web Tokens Instantly

In modern web development, **JSON Web Tokens (JWT)** are the standard for stateless authentication and secure information exchange. However, because they are Base64 encoded, they look like a jumble of random characters to the human eye. 

The **Armytool JWT Parser** is your window into the data that powers your application's security.

## 1. What the Tool Does
The JWT Parser is a specialized utility that takes a JWT string and breaks it down into its three constituent parts:
- **Header:** Contains metadata about the token, such as the type (JWT) and the signing algorithm (e.g., HS256, RS256).
- **Payload:** The "claims" or data stored in the token (e.g., user ID, roles, expiration time).
- **Signature:** The cryptographic proof that the token hasn't been modified.

Our tool decodes these sections in real-time, providing a clean, formatted JSON view of the contents.

## 2. Why Professionals Use It
Debugging authentication flows is one of the most common tasks for web developers. This tool is essential for:
- **Identity Verification:** Checking if a token actually contains the user roles or permissions you expect.
- **Expiration Debugging:** Instantly seeing the `exp` (expiration) and `iat` (issued at) timestamps in a human-readable format.
- **Security Audits:** Ensuring that sensitive data hasn't been accidentally included in the public payload.
- **Local Debugging:** Since our parser is **client-side only**, you can safely inspect production tokens without sending them to a third-party server.

## 3. Step-by-Step Instructions

1. **Input:** Paste your complete JWT (the string with two dots) into the input area.
2. **Auto-Parsing:** The tool will immediately split the token and decode each section.
3. **Inspect Header:** View the algorithm and token type.
4. **Inspect Payload:** Navigate through the user data and claims.
5. **Timestamp Conversion:** The tool automatically converts Unix timestamps (`exp`, `iat`, `nbf`) into human-readable dates.
6. **Validation:** If the token is malformed or invalid, the tool will provide feedback.

## 4. Example

### JWT String
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ...`

### Parsed Payload
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022 (Mon, 15 Jan 2018 14:50:22 GMT)
}
```

## 5. FAQs

**Q: Does this tool verify the signature?**
A: This tool is primarily a **decoder and viewer**. Verification requires your private secret or public key, which should never be entered into a web browser for security reasons.

**Q: Can I edit the JWT here?**
A: You can edit the JSON payload to see how it would look, but you cannot "re-sign" the token without your server's private key.

**Q: Is my token stored?**
A: No. All parsing happens in your browser. Your authentication tokens remain private and never leave your machine.

## 6. Common Mistakes
- **Confusing JWT with Encryption:** Standard JWTs are **encoded**, not encrypted. Anyone who sees the token can read the data. Never store passwords or private keys inside a JWT.
- **Ignoring the Expiration:** Many "bugs" in auth systems are simply tokens that have expired. Use this tool to check the `exp` claim first.
- **Pasting the "Bearer " Prefix:** Ensure you only paste the token string itself, starting with `ey...`.

## 7. Real-World Use Cases
- **Single Sign-On (SSO):** Inspecting the claims returned by providers like Auth0, Firebase, or AWS Cognito.
- **Frontend Development:** Checking if your React/Vue app is correctly receiving the user's permissions from the backend.
- **Backend Testing:** Verifying that your token generation logic is correctly setting the `aud` (audience) and `iss` (issuer) fields.

## 8. Related Tools
- **JSON Viewer:** For general formatting of the payloads you find in tokens.
- **Bcrypt Tool:** For the password hashing that usually happens *before* a JWT is issued.
- **Base64 Converter:** To understand how the individual parts of the JWT are encoded.
- **Timestamp Converter:** For deeper analysis of the dates found in token claims.

---
*Auth flows decoded. Security simplified. Use Armytool.*
