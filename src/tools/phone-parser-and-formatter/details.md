# Phone Parser and Formatter

## What it does
The Phone Parser and Formatter is a comprehensive utility for analyzing and normalizing telephone numbers. Powered by the industry-standard `libphonenumber-js` library, it can validate, parse, and format phone numbers from any country in the world. It provides multiple formatting styles (International, National, E.164, and RFC3966) and extracts metadata such as the country of origin and the type of number (mobile, fixed-line, etc.).

## Why someone uses it
- **Data Standardization:** To ensure all phone numbers in a database follow a consistent format like E.164.
- **Input Validation:** To verify if a phone number provided by a user is actually valid according to their country's numbering plan.
- **User Experience:** To automatically format local numbers into a readable national format for display.
- **International Communications:** To find the correct country calling code and international format for calling abroad.

## Step-by-step instructions
1. **Select Default Country:** Use the dropdown menu to select the default country. This is used to interpret the number if you don't provide an international prefix (like `+1`).
2. **Enter Phone Number:** Type or paste the number into the **Phone number** field. You can include spaces, dashes, or parentheses.
3. **Analyze Results:** The tool instantly generates a table with parsed details.
4. **Copy Formatted Number:** Click the copy icon next to any of the formats (e.g., **International format**) to copy it to your clipboard.

## Examples
- **Local Input:** Selecting "United Kingdom (+44)" and entering `07123 456789` will show it as a valid mobile number formatted internationally as `+44 7123 456789`.
- **International Input:** Entering `+33612345678` will automatically detect France and show the national format as `06 12 34 56 78`.
- **Type Detection:** Entering a toll-free number like `+1 800-444-4444` will identify the type as "Toll-free".

## FAQs
- **What is E.164 format?** It is the internationally recognized standard for phone numbers, consisting of a `+`, the country code, and the subscriber number without any spaces or special characters (e.g., `+12025550123`).
- **What is the difference between "Valid" and "Possible"?** "Possible" means the number has a length that makes sense for the region. "Valid" means it actually matches the known numbering patterns for that region.
- **Does it support vanity numbers?** No, it primarily handles numeric input. Letters in phone numbers (like 1-800-FLOWERS) should be converted to digits first.

## Common mistakes
- **Ignoring the Plus Sign:** If you don't select a default country, you must start international numbers with `+`.
- **Wrong Default Country:** Entering a local number from one country while the default is set to another will result in an invalid status or an incorrect interpretation.

## Use cases
- **CRM Management:** Cleaning up customer contact lists before importing them into a CRM.
- **SMS Marketing:** Ensuring phone numbers are in E.164 format for compatibility with SMS gateways like Twilio.
- **Web Development:** Testing and debugging phone number validation logic in forms.

## Related tools
- **IBAN Validator and Parser:** For validating and formatting international bank account numbers.
- **User Agent Parser:** For identifying device and browser information from a string.
- **URL Parser:** To break down and validate complex web addresses.
