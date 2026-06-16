# MIME Types

## What it does
The MIME Types tool is a comprehensive reference and conversion utility for Multipurpose Internet Mail Extensions (MIME). It allows users to quickly find the file extensions associated with a specific MIME type or identify the correct MIME type for a given file extension.

## Why professionals use it
- **Web Development:** Correctly setting the `Content-Type` header in HTTP responses so browsers handle files (like images, scripts, or PDFs) correctly.
- **Server Configuration:** Mapping file extensions to MIME types in web server configurations (e.g., Apache, Nginx).
- **File Upload Handling:** Validating uploaded files on the backend by checking their MIME type against allowed lists.
- **Email Programming:** Attaching files to emails with the appropriate MIME type to ensure they are interpreted correctly by mail clients.

## Instructions
### Mime type to extension
1. Locate the **Mime type to extension** card.
2. Select or search for a MIME type (e.g., `application/json`) in the dropdown.
3. The tool will display all file extensions associated with that MIME type.

### File extension to mime type
1. Locate the **File extension to mime type** card.
2. Select or search for a file extension (e.g., `.jpg`) in the dropdown.
3. The tool will display the primary MIME type associated with that extension.

### Full Reference Table
- Scroll down to view a complete, searchable list of all supported MIME types and their corresponding extensions.

## Examples
- **JSON:** `application/json` <-> `.json`
- **JPEG Image:** `image/jpeg` <-> `.jpeg`, `.jpg`, `.jpe`
- **PDF Document:** `application/pdf` <-> `.pdf`
- **JavaScript:** `application/javascript` <-> `.js`
- **CSV:** `text/csv` <-> `.csv`

## FAQs
- **What does MIME stand for?** Multipurpose Internet Mail Extensions. It was originally designed for email but is now the standard way to identify file formats on the web.
- **Can a file extension have multiple MIME types?** Generally, an extension has one primary MIME type, but some extensions might be associated with multiple types depending on the context or legacy standards.
- **Can a MIME type have multiple extensions?** Yes, many MIME types (like `image/jpeg`) support multiple common extensions (`.jpg`, `.jpeg`).

## Common Mistakes
- **Typos:** Confusing similar MIME types, like `application/javascript` and `text/javascript`.
- **Incomplete Mappings:** Assuming a file extension always implies a specific MIME type without verification.
- **Case Sensitivity:** While MIME types are generally case-insensitive, it's best practice to use lowercase.

## Use Cases
- **API Development:** Ensuring your API returns `application/json` so clients can parse the response automatically.
- **Cloud Storage:** Setting the correct metadata when uploading files to services like Amazon S3 or Google Cloud Storage.
- **Security:** Preventing "MIME sniffing" attacks by explicitly defining the content type of your files.

## Related Tools
- **HTTP Status Codes:** Understand the response headers that accompany MIME types.
- **User Agent Parser:** See how different devices might request different content types.
- **Base64 File Converter:** Encode files of various MIME types into strings for web use.
