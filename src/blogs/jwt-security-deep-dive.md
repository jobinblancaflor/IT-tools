# JWT Security: Common Pitfalls and Best Practices

JSON Web Tokens (JWT) have become the industry standard for stateless authentication and authorization. By encapsulating claims in a cryptographically signed token, JWTs allow services to verify identity without querying a central session store on every request. However, the simplicity of JWTs is often a double-edged sword; improper implementation can lead to catastrophic security vulnerabilities, including full account takeover and privilege escalation.

This article explores the critical pitfalls associated with JWT implementation and provides a rigorous framework for securing your authentication layer.

## Key Takeaways
- **Never trust the `alg` header** blindly; explicitly define the expected algorithm in your verification logic.
- **Prefer Asymmetric Signing (RS256/ES256)** over Symmetric Signing (HS256) for distributed systems to avoid sharing secret keys.
- **Implement short-lived Access Tokens** paired with opaque, database-backed Refresh Tokens.
- **Avoid storing sensitive data in payloads**, as JWTs are base64-encoded, not encrypted.
- **Utilize specialized tools** like `jwt-parser` from the ArmyTool suite to inspect and debug tokens during development.

---

## The Anatomy of a JWT Vulnerability

To understand the pitfalls, we must recall that a JWT consists of three parts: the Header, the Payload, and the Signature. The Header tells the server how the token is signed, the Payload contains the data, and the Signature ensures the token hasn't been tampered with.

### 1. The "None" Algorithm Attack
One of the most famous JWT vulnerabilities is the `none` algorithm exploit. The JWT specification allows for an unsigned token where the `alg` header is set to `none`. If a server's verification library is poorly configured, it may accept these tokens as valid.

**The Scenario:**
An attacker changes their user ID in the payload from `123` (user) to `1` (admin) and sets the header to `{"alg": "none"}`. If the server doesn't enforce a specific algorithm, it sees `alg: none`, skips signature verification, and grants the attacker administrative access.

**The Fix:**
Never rely on the header to determine the verification method. Explicitly pass the required algorithm to your verification function.

```javascript
// ❌ DANGEROUS: Relying on the token's own header
const decoded = jwt.verify(token, secret); 

// ✅ SECURE: Explicitly defining the algorithm
const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
```

### 2. Algorithm Confusion (HS256 vs. RS256)
Algorithm confusion occurs when a server expects an asymmetric public key (RS256) but the attacker provides a token signed with a symmetric key (HS256), using the server's public key as the HS256 secret.

Because RS256 public keys are often public or easily discoverable, an attacker can sign a token using that public key as the secret for HS256. The server, seeing `alg: HS256`, uses its public key to "verify" the signature, and the math works out, validating the forged token.

**The Fix:**
Strictly separate your key management for symmetric and asymmetric algorithms. Ensure your code does not allow a token to switch algorithms dynamically.

---

## Architecture Best Practices

### Statelessness vs. Revocability
The primary draw of JWTs is statelessness. However, this creates a massive security gap: **tokens cannot be easily revoked**. If a user's token is stolen, it remains valid until it expires.

**The Solution: The Hybrid Token Strategy**
Implement a two-tier token system:
1. **Access Token:** Short-lived (e.g., 15 minutes), stored in memory or a secure cookie.
2. **Refresh Token:** Long-lived (e.g., 7 days), stored in a `HttpOnly`, `Secure` cookie and tracked in a database.

When the access token expires, the client uses the refresh token to request a new one. This allows the server to revoke the refresh token in the database, effectively killing the session.

### Secure Storage in the Browser
Storing JWTs in `localStorage` makes them accessible to any JavaScript running on the page, leaving them vulnerable to Cross-Site Scripting (XSS) attacks.

**The Best Practice:**
Store tokens in **`HttpOnly` and `Secure` cookies**. This prevents JavaScript from accessing the token while ensuring it is only sent over encrypted HTTPS connections. To prevent Cross-Site Request Forgery (CSRF), pair this with a `SameSite=Strict` or `Lax` attribute and a custom CSRF token.

---

## Implementation Checklist for High E-E-A-T Security

### Payload Hardening
- **No PII:** Never put passwords, emails, or social security numbers in a JWT. Anyone who intercepts the token can read the payload.
- **Standard Claims:** Always use `exp` (expiration time), `iat` (issued at), and `iss` (issuer) to prevent replay attacks and ensure token freshness.

### Cryptographic Rigor
- **Key Strength:** If using HS256, ensure your secret is a high-entropy random string of at least 32 bytes.
- **Rotation:** Implement a key rotation policy. Use a Key Management Service (KMS) to rotate signing keys without downtime.

### Debugging and Auditing
During the development phase, inspecting tokens is crucial for verifying that claims are correctly mapped. Rather than using potentially insecure online decoders, use local tools. For example, the **`jwt-parser`** utility from ArmyTool provides a secure, offline way to decode and analyze JWT structures, ensuring your sensitive tokens never leave your local environment.

## Summary Table: Security Trade-offs

| Feature | Wrong Way | Right Way | Reason |
| :--- | :--- | :--- | :--- |
| **Algorithm** | `alg: none` or dynamic | Fixed `HS256` or `RS256` | Prevents signature bypass |
| **Storage** | `localStorage` | `HttpOnly` Cookie | Mitigates XSS |
| **Lifetime** | 30 Days | 15 Mins (Access) / 7 Days (Refresh) | Limits window of exploitation |
| **Payload** | User Email/Role | User UUID / Minimal Claims | Prevents data leakage |
| **Verification** | `jwt.verify(token, key)` | `jwt.verify(token, key, {algorithms: [...]})` | Prevents algorithm confusion |

By adhering to these standards, developers can leverage the scalability of JWTs without introducing the vulnerabilities that lead to systemic breaches. Security is not a one-time setup but a continuous process of auditing and hardening.
