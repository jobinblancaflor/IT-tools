# Email Normalizer

## 1. What the tool does
The Email Normalizer is a high-performance utility designed to sanitize and standardize email addresses. It processes lists of email addresses to remove common variations that point to the same underlying inbox. This process, known as "normalization," involves converting emails to a canonical format by handling provider-specific quirks, such as sub-addressing (the `+` suffix) and character-specific rules (like dots in Gmail).

The tool takes a raw list of emails—often gathered from sign-up forms, databases, or marketing logs—and outputs a cleaned version where each entry is lowercase, stripped of unnecessary characters, and resolved to its simplest functional form. It uses the `email-normalizer` engine to apply these rules consistently across thousands of entries.

## 2. Why someone uses it
Email normalization is critical for data integrity, security, and marketing efficiency. Without it, a single user can appear as multiple distinct entities in a system.

Key reasons for using this tool include:
- **Deduplication:** Preventing a single user from signing up multiple times using variations of the same email (e.g., `user@gmail.com` vs `u.s.e.r@gmail.com`).
- **Database Integrity:** Ensuring that user lookups are consistent. If a system stores `User+123@gmail.com`, a search for `user@gmail.com` might fail without normalization.
- **Marketing Costs:** Reducing costs for email service providers (ESPs) by ensuring you aren't sending three different emails to the same physical person.
- **Security & Fraud Prevention:** Detecting "sybil attacks" where a malicious actor creates hundreds of accounts that all funnel to one inbox for the purpose of claiming rewards, gaming referrals, or bypassing rate limits.
- **Compliance:** Ensuring that "Unsubscribe" requests are applied to all variations of an email address.

## 3. Step-by-step instructions
The tool is designed for bulk processing with a simple interface:

1.  **Input Gathering:** Collect the email addresses you need to normalize. This can be a single email or a list of thousands.
2.  **Paste Emails:** Enter your emails into the "Raw emails to normalize" text area. Each email should be on its own line.
3.  **Real-time Processing:** The tool automatically processes the list as you type or paste. You will see the results appearing in the "Normalized emails" section.
4.  **Error Handling:** If an entry is not a valid email format, the tool will flag it with a message: `Unable to parse email: [input]`. This helps you identify malformed data in your source list.
5.  **Finalize:** 
    - Click **"Copy normalized emails"** to copy the entire cleaned list to your clipboard.
    - Click **"Clear emails"** to reset the tool for a new batch.

## 4. Examples

### The Gmail "Dot" Trick
Gmail ignores periods in the username portion of an email.
- **Input:** `john.doe.dev@gmail.com`
- **Output:** `johndoedev@gmail.com`

### Sub-addressing (Plus Addressing)
Many providers allow adding a `+` followed by any string for filtering.
- **Input:** `marketing-team+newsletter@company.com`
- **Output:** `marketing-team@company.com`

### Case Sensitivity
While the local part of an email can technically be case-sensitive according to RFCs, in practice, almost no modern providers treat them that way.
- **Input:** `SUPPORT@Example.ORG`
- **Output:** `support@example.org`

### Mixed Batch Processing
**Input:**
```text
John.Doe+test@gmail.com
JaneDoe@outlook.com
invalid-email-string
admin@MyCompany.com
```
**Output:**
```text
johndoe@gmail.com
janedoe@outlook.com
Unable to parse email: invalid-email-string
admin@mycompany.com
```

## 5. FAQs

**Q: Does it work for all email providers?**
A: It applies standard RFC normalization to all emails and applies specific "aggressive" normalization rules for major providers like Gmail, Outlook/Hotmail, iCloud, and Yahoo.

**Q: Is the normalization reversible?**
A: No. Normalization is a destructive process intended to find the "root" inbox. Once you remove `+tags` or dots, you cannot programmatically know which ones were there originally.

**Q: Does it verify if the email actually exists?**
A: No. This tool is a syntax and logic-based transformer. It does not perform SMTP handshakes or check MX records to see if the inbox is active.

**Q: Is my data sent to your servers?**
A: No. All processing happens locally in your browser's JavaScript engine. Your email lists never leave your machine.

## 6. Common mistakes
- **Treating local-parts as always case-sensitive:** While technically allowed by early standards, treating `Email@` and `email@` as different is a recipe for duplicate data in 99% of use cases.
- **Ignoring the "Dot" rule:** Systems that don't normalize Gmail dots are highly vulnerable to trial abuse.
- **Forgetting to trim whitespace:** Often, copy-pasting from Excel or CSVs introduces leading/trailing spaces. This tool automatically handles trimming during the normalization process.
- **Using Normalized Emails for Communication:** You should generally store the *original* email for sending (to respect the user's preferred format) but use the *normalized* version as a unique key in your database.

## 7. Use cases
- **Data Migration:** Cleaning up a legacy CRM where users have been entered with various formatting styles over the years.
- **Referral Program Validation:** Checking if a new "referral" is just an existing user using a `+1`, `+2` alias.
- **Log Analysis:** Aggregating logs from different systems where one system captured emails in lowercase and another in CamelCase.
- **E-commerce Checkout:** Preventing customers from using the same "first-time buyer" discount code multiple times by slightly altering their email address.

## 9. Technical Deep Dive: The Mechanics of Normalization
Normalization is a multi-stage process that balances RFC compliance with the practical realities of how major email providers operate. The `email-normalizer` library follows a specific execution pipeline for every entry.

### Stage 1: Basic Sanitization
First, the tool performs a global lowercase conversion and trims all leading and trailing whitespace. It then splits the email into two parts: the `local-part` (before the `@`) and the `domain` (after the `@`).

### Stage 2: Domain-Specific Logic
The tool maintains a registry of major email providers and their unique handling rules. 
- **Google (gmail.com, googlemail.com):** The tool identifies these domains and applies the most aggressive rules: removing all dots from the local-part and stripping everything after the first `+` character.
- **Microsoft (outlook.com, hotmail.com, live.com):** Similar to Google, these domains support sub-addressing with the `+` character, which is stripped. However, unlike Gmail, they do *not* ignore dots.
- **Apple (icloud.com, me.com):** These follow the sub-addressing rules but have specific handling for their aliases and "Hide My Email" features.

### Stage 3: The "Sub-addressing" Parser
For domains not explicitly in the provider registry, the tool checks for common sub-addressing characters. While `+` is the most common, some systems use `-` or `_`. The normalizer defaults to stripping `+` suffixes to ensure broad compatibility without risking the corruption of standard "dashed" emails (like `first-last@company.com`).

### Stage 4: Reassembly
Finally, the tool reassembles the normalized local-part and the domain into a canonical string. If at any point the string fails a basic regex validation (e.g., missing an `@` or having invalid characters in the domain), the original string is returned with an error prefix to prevent the loss of data.

## 10. Security Considerations
While primarily a utility tool, email normalization has significant security implications.

### Sybil Attack Mitigation
In distributed systems, a "Sybil attack" occurs when one person creates many identities. By using this tool to normalize emails *before* checking for existing accounts, you can effectively block users from creating 100 accounts using `user+1@gmail.com` through `user+100@gmail.com`.

### Data Privacy
Normalization can be a form of "deanonymization." If you have a database of normalized emails, you can potentially link disparate data points that were intended to be separate. Always ensure that your use of normalized data complies with local regulations like GDPR or CCPA, especially regarding the storage of "identifiable" vs "canonical" data.
