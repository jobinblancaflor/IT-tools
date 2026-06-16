# Outlook SafeLink Decoder

## What it does
The Outlook SafeLink Decoder is a specialized utility that extracts the original destination URL from a Microsoft 365 "SafeLink". Microsoft Outlook wraps external links in a protective layer to scan for phishing and malware. This tool peels back that layer, revealing the actual website address hidden inside the complex string of parameters.

## Why someone uses it
- **Privacy & Tracking:** To visit a website directly without being tracked by Microsoft’s link-redirection system.
- **Security Analysis:** To inspect a suspicious link's actual destination before clicking on it or opening it in a sandbox.
- **Troubleshooting:** To bypass SafeLink redirection if Microsoft’s service is slow, down, or incorrectly blocking a legitimate site.
- **Clean Sharing:** To get a "clean" URL to share with others, free from the bulky Microsoft metadata.

## Step-by-step instructions
1. **Copy the Link:** In Outlook, right-click on the link you want to decode and select **Copy Link**.
2. **Paste the Link:** Paste the long URL (which usually starts with `https://*.safelinks.protection.outlook.com/`) into the input field.
3. **View Result:** The tool instantly extracts the original URL and displays it in the output area.
4. **Copy Output:** Use the copy button to save the clean, decoded URL to your clipboard.

## Examples
- **SafeLink Input:** `https://nam01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fgithub.com%2F&data=04%7C01%7C...`
- **Decoded Output:** `https://github.com/`
- **Benefit:** You get a short, readable link instead of a paragraph-long URL.

## FAQs
- **What is a SafeLink?** It is part of Microsoft’s "Advanced Threat Protection". It wraps every link in an email so that when you click it, you are first sent to a Microsoft server that verifies the destination is safe.
- **Does this tool work for Proofpoint or other filters?** No, this specific tool is tailored for the Microsoft Outlook SafeLink format.
- **Is my data sent to Microsoft or any other server?** No. The decoding happens entirely within your browser's memory. No data is sent to our servers or back to Microsoft.

## Common mistakes
- **Pasting the Link Text:** Sometimes people copy the *text* of a link (like "Click Here") instead of the actual *address*. Make sure you copy the link address.
- **Partial Copy:** SafeLinks are very long. Ensure you have copied the entire URL, otherwise the tool may not be able to find the `url=` parameter.

## Use cases
- **Phishing Investigation:** Security researchers often use decoders to find where a malicious link is trying to send a victim.
- **Documentation:** When writing guides or documentation, you want to include the actual link, not a temporary Microsoft-wrapped version.
- **Bypassing Blocks:** If Microsoft’s filter is mistakenly blocking a site you know is safe, you can decode it to go there directly.

## Related tools
- **URL Parser:** For breaking down any URL into its protocol, host, path, and query parameters.
- **URL Encoder/Decoder:** Useful if you need to manually handle specific parts of a URL that are percent-encoded.
- **Base64 String Converter:** Occasionally, data within these links may be further encoded in Base64 format.
