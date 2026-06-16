# PDF Signature Checker

## What it does
The PDF Signature Checker is a specialized tool that scans PDF documents for digital signatures. When a signature is detected, the tool extracts and displays the cryptographic certificate information, including the signer's identity, the issuing authority, and the validity dates. This allows you to verify the integrity and origin of digitally signed documents.

## Why someone uses it
-   **Security Verification:** To ensure that a PDF document has not been altered after it was digitally signed.
-   **Identity Confirmation:** To verify the real-world identity of the person or organization that signed the document.
-   **Compliance & Auditing:** To collect certificate details for regulatory requirements or internal security audits.
-   **Technical Troubleshooting:** To diagnose why a signature might be showing as invalid in other PDF viewers by examining the raw certificate data.

## Step-by-step instructions
1.  Locate the upload box labeled "Drag and drop a PDF file here".
2.  Select your PDF file by dragging it into the box or by clicking to open your file browser.
3.  The tool will process the file locally in your browser.
4.  If the PDF contains digital signatures, they will be displayed in a list.
5.  Review the details for each signature, including:
    *   **Common Name (CN):** The name of the signer.
    *   **Organization (O):** The signer's organization.
    *   **Issuer:** Who verified and issued the certificate.
    *   **Validity Period:** The dates during which the signature is considered valid.

## Examples
-   **Electronic Contracts:** Verify that a signed sales agreement contains the correct digital certificates from both parties.
-   **Government Documents:** Check the digital seal on an official certificate or transcript.
-   **Corporate Invoices:** Ensure that an invoice received electronically is genuinely from the stated vendor and has not been tampered with in transit.

## FAQs
-   **Is my document uploaded to a server?** No. All PDF parsing and signature extraction happen entirely within your browser. Your sensitive documents never leave your computer.
-   **Why does it say "No signatures found" on a signed document?** Digital signatures are cryptographic. A visual image of a handwritten signature is not a "digital signature" and cannot be detected by this tool. Only cryptographic signatures (like those created in Adobe Acrobat or via DocuSign) are detectable.
-   **Can this tool tell if the signature is "Trusted"?** The tool extracts and shows you the certificate data. Whether you "trust" that certificate depends on whether you trust the Issuer (CA) listed in the details.
-   **Does it work with encrypted PDFs?** No, the PDF must be decrypted or not password-protected for the tool to read the internal signature objects.

## Common mistakes
-   **Visual vs. Digital:** Assuming a scanned image of a signature is a digital signature.
-   **Trust Confusion:** Thinking that the presence of a signature automatically means the document is "legally binding" without verifying the identity of the signer.
-   **Modified Files:** Expecting a signature to remain valid if the file was modified after signing (e.g., by adding a page or changing text).

## Use cases
-   **Legal Review:** Quickly checking the certificate details of signed legal filings.
-   **Procurement:** Verifying the authenticity of digital signatures on procurement bids.
-   **HR:** Ensuring that digitally signed employment contracts are intact and verified.

## Related tools
-   **RSA Key Pair Generator:** Understand the technology behind public/private keys used in signatures.
-   **Base64 File Converter:** Useful if you need to encode or decode the PDF for different transmission methods.
-   **Hash Text:** To manually verify the checksum of a file to ensure it hasn't changed.
