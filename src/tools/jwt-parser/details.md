# jwt-parser: Professional JWT Analysis & Decoding Tool

`jwt-parser` is a specialized developer utility designed to decompose JSON Web Tokens (JWTs) into human-readable components. Unlike generic base64 decoders, it provides semantic context for standard JWT claims and cryptographic algorithms, enabling rapid debugging of authentication and authorization flows.

## 1. What the tool does
The tool performs a non-cryptographic decode of a JWT string. It strips the signature and parses the Base64Url-encoded Header and Payload. 

**Key capabilities include:**
- **Header Decomposition:** Extracts metadata such as the signing algorithm (`alg`) and token type (`typ`).
- **Payload Analysis:** Decodes all claims within the token payload.
- **Semantic Mapping:** Maps cryptic IANA claim keys (e.g., `sub`, `iat`, `exp`) to their human-readable descriptions.
- **Temporal Conversion:** Automatically converts Unix Epoch timestamps (seconds) into localized, readable date-time strings.
- **Algorithm Resolution:** Translates algorithm identifiers (e.g., `RS256`) into their full technical descriptions (e.g., `RSASSA-PKCS1-v1_5 using SHA-256`).
- **Structured Data Formatting:** Pretty-prints nested JSON objects or arrays found within claims for clear visibility.

## 2. Why someone uses it
Developers and sysadmins use `jwt-parser` to eliminate the "black box" nature of tokens during the following scenarios:
- **Auth Debugging:** Verifying if a token contains the correct `scope`, `roles`, or `user_id` without needing to write a script.
- **Expiration Auditing:** Instantly checking the `exp` (Expiration Time) and `nbf` (Not Before) claims to diagnose "Token Expired" errors.
- **Algorithm Validation:** Confirming that the token is using the expected signing algorithm to prevent "alg: none" attacks or algorithm confusion vulnerabilities.
- **Issuer Verification:** Ensuring the `iss` (Issuer) claim matches the expected identity provider (IdP) environment.

## 3. Step-by-Step Instructions

### Basic Decoding
1. **Obtain Token:** Copy the JWT string from your application's HTTP headers (usually `Authorization: Bearer <token>`) or browser local storage.
2. **Input:** Paste the raw JWT string into the parser input field.
3. **Analyze:** View the parsed **Header** and **Payload** sections.
4. **Verify:** Check the "Friendly Value" column for date-time conversions and algorithm descriptions.

### Advanced Usage: Troubleshooting Token Lifecycle
1. **Check `iat` (Issued At):** Determine when the token was created to calculate the token's age.
2. **Check `exp` (Expiration):** Compare the converted date-time against the current system time to determine the exact second the token becomes invalid.
3. **Inspect Custom Claims:** Look for non-standard claims (those not in the IANA list) to verify application-specific business logic (e.g., `tenant_id` or `subscription_level`).

## 4. Examples

### Example: Standard OIDC ID Token
**Input:** `eyJhbGciOiJSUzI1NiIs...`
**Parsed Header:**
- `alg`: RS256 $\\rightarrow$ *RSASSA-PKCS1-v1_5 using SHA-256*
- `typ`: JWT $\\rightarrow$ *Type*

**Parsed Payload:**
- `sub`: `1234567890` $\\rightarrow$ *Subject*
- `iat`: `1623456000` $\\rightarrow$ *June 8, 2021 10:00 AM*
- `exp`: `1623459600` $\\rightarrow$ *June 8, 2021 11:00 AM*
- `email`: `dev@example.com` $\\rightarrow$ *Preferred e-mail address*

## 5. FAQs
**Q: Does this tool verify the signature of the JWT?**
**A:** No. This is a **parser**, not a validator. It decodes the content. To verify a signature, you must provide the public key or secret to a cryptographic library (like `jsonwebtoken` or `jose`).

**Q: Is it safe to paste production tokens here?**
**A:** The tool performs client-side decoding. However, as a general security practice, avoid pasting sensitive production tokens into any tool unless you are certain the data does not leave your controlled environment.

**Q: Why does my date look wrong?**
**A:** JWT timestamps are in Unix Epoch seconds. The tool converts these to your local system time. If the token was issued in a different timezone, the local conversion is correct for your viewing context.

## 6. Common mistakes
- **Confusing Decoding with Verification:** Assuming that because a token "looks correct" in the parser, it is valid. A token can be decoded even if the signature is forged or the token has expired.
- **Ignoring the `nbf` (Not Before) Claim:** Forgetting to check if a token is being used *before* its valid start time, leading to intermittent "Unauthorized" errors.
- **Misinterpreting `sub`:** Assuming the `sub` (Subject) is always a username. In many systems, the `sub` is a GUID or an internal numeric ID.

## 7. Use cases (Professional/Industrial)
- **API Gateway Troubleshooting:** A sysadmin at an edge gateway observes 401 errors. They capture a sample token and use `jwt-parser` to find that the `aud` (Audience) claim does not match the gateway's expected ID.
- **Microservices Auth Debugging:** A developer is implementing RBAC (Role-Based Access Control). They use the tool to ensure the `roles` array in the JWT contains the required `admin` permission before the request hits the backend.
- **SSO Integration:** When integrating a new SAML/OIDC provider, the engineer uses the tool to map the provider's custom claims to the application's internal user profile.

## 8. Related Resources
- **Deep Dive**: Read our [JWT Security Deep Dive](/blogs/jwt-security-deep-dive) for a detailed analysis of algorithm confusion and signature verification.
- **Related Tools**: 
  - [Bcrypt](/tools/bcrypt): For understanding how passwords that *become* JWTs should be stored.
  - [Base64 String Converter](/tools/base64-string-converter): For manual decoding of JWT segments.
- **External Sources**:
  - [jwt.io](https://jwt.io): The industry-standard web debugger for JWTs.
  - [Kube-jwt](https://github.com/kubernetes-sigs/kube-jwt): For parsing tokens within Kubernetes clusters.
  - [JOSE Standard](https://jose.org/): The underlying standard and set of libraries used for actual signing and verification.
