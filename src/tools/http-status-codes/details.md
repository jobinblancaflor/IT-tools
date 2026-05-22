# HTTP Status Codes: The Comprehensive Reference Guide

## What the tool does

The HTTP Status Codes tool is a specialized, searchable database designed to provide instant access to the full spectrum of Hypertext Transfer Protocol (HTTP) response status codes. It serves as a centralized repository where developers, network engineers, and system administrators can look up the meanings, implications, and categories of various numeric codes returned by web servers.

The tool organizes codes into their standard functional groups (1xx through 5xx) and includes not only the standard HTTP/1.1 and HTTP/2 codes but also specialized extensions like those used in WebDAV (Web Distributed Authoring and Versioning). Each entry provides the numeric code, its official name, a concise technical description, and its protocol origin. With a built-in fuzzy search engine, users can quickly filter through the list by typing the code number, name, or keywords found in the description.

## Why someone uses it

In the world of web development and networking, HTTP status codes are the primary language used for communication between a client (like a web browser or API consumer) and a server. When things go right—or more importantly, when they go wrong—these codes are the first line of diagnostic information.

### 1. Debugging and Troubleshooting
When a web application fails to load or an API call returns an error, the status code tells the developer where to look. A `404 Not Found` indicates a pathing issue, while a `500 Internal Server Error` points to a failure in the server-side logic. Having a quick reference helps identify these issues without needing to memorize the entire RFC 7231 or RFC 9110 specification.

### 2. API Design and Implementation
Developers building RESTful APIs need to ensure they are returning the most semantically correct status codes. Using a generic `400 Bad Request` might be functional, but returning a `409 Conflict` or `422 Unprocessable Entity` provides much more clarity to the API consumer. This tool allows developers to explore "niche" codes that might better fit their specific use case.

### 3. Learning and Education
For those new to web technologies, the hierarchical structure of HTTP codes (Informational, Success, Redirection, Client Error, Server Error) can be overwhelming. This tool provides a structured environment to learn what each category represents and how specific codes relate to each other.

### 4. Identifying Non-Standard Codes
Protocols like WebDAV add their own status codes (like `207 Multi-Status` or `423 Locked`). Developers working with file systems over HTTP or specialized CMS integrations use this tool to differentiate between standard web codes and protocol-specific extensions.

## Step-by-step instructions

Using the HTTP Status Codes tool is designed to be frictionless and intuitive.

1.  **Access the Tool:** Navigate to the "HTTP status codes" section in the IT-tool interface.
2.  **Browse Categories:** Upon loading, you will see the codes grouped into five main categories:
    *   **1xx Informational:** Request received, continuing process.
    *   **2xx Success:** The action was successfully received, understood, and accepted.
    *   **3xx Redirection:** Further action must be taken in order to complete the request.
    *   **4xx Client Error:** The request contains bad syntax or cannot be fulfilled.
    *   **5xx Server Error:** The server failed to fulfill an apparently valid request.
3.  **Use the Search Bar:** To find a specific code, click on the search input at the top of the page. You can:
    *   Type a specific number (e.g., "403").
    *   Type a status name (e.g., "Teapot").
    *   Type a keyword from the description (e.g., "Gateway").
4.  **Review the Details:** The tool will dynamically filter results as you type. Each result card displays the code, the name, a brief explanation, and the protocol type (HTTP or WebDav).
5.  **Copy Information:** If you need to include the description in your documentation or a bug report, you can highlight and copy the text directly from the result cards.

## Examples

### Example 1: Troubleshooting an API
A developer notices their frontend is receiving a `429` error. They type "429" into the search bar. The tool returns:
*   **Code:** 429
*   **Name:** Too Many Requests
*   **Description:** The user has sent too many requests in a given amount of time ("rate limiting").
*   **Action:** The developer realizes they need to implement a "retry-after" logic or slow down their request frequency.

### Example 2: Selecting the right Success Code
A developer is implementing a resource creation endpoint. They check the `2xx` category.
*   They see `200 OK` (standard) but then find `201 Created`.
*   **Description:** The request has been fulfilled, resulting in the creation of a new resource.
*   **Decision:** They decide to use `201` as it is more specific for their "Create User" endpoint.

### Example 3: Finding WebDAV specific codes
A developer working on a cloud storage integration types "locked" into the search.
*   The tool shows `423 Locked (WebDav)`.
*   **Description:** The resource that is being accessed is locked.
*   **Context:** This confirms the error is protocol-specific and not a general HTTP client error.

## FAQs

### Q: Are these codes official?
A: Yes, the codes listed are based on the IANA (Internet Assigned Numbers Authority) registry and relevant RFCs (Request for Comments) that define the HTTP protocol standards.

### Q: What is the difference between a 4xx and a 5xx error?
A: Generally, `4xx` errors are the "fault" of the client (bad URL, missing authentication, too many requests), while `5xx` errors are the "fault" of the server (code crashing, database connection failure, gateway timeout).

### Q: Why do some codes say "WebDav"?
A: WebDAV is an extension of HTTP that allows clients to perform remote web content authoring operations. It introduces several specific status codes that are not part of the core HTTP specification but are widely used in certain types of applications.

### Q: Is "418 I'm a teapot" a real code?
A: While it originated as an April Fools' joke (RFC 2324), it is technically a defined code and is often implemented as an "easter egg" by developers. However, it should not be used for serious production error handling.

### Q: Can I search by just part of a number?
A: Yes, the fuzzy search allows you to type "40" to see all 40x codes, or "5" to see many 5xx errors.

## Common mistakes

### 1. Using 200 OK for everything
Many developers return a `200 OK` with an error message in the JSON body (e.g., `{ "error": "failed" }`). This is a bad practice. Status codes should reflect the actual result of the request so that infrastructure (like load balancers and monitoring tools) can correctly track health.

### 2. Confusing 401 and 403
`401 Unauthorized` actually means "Unauthenticated"—the server doesn't know who you are. `403 Forbidden` means the server knows who you are, but you don't have permission to do what you're trying to do.

### 3. Misusing 301 and 302
`301 Moved Permanently` is cached by browsers and search engines. If you use it by mistake for a temporary change, it can be very hard to undo. Use `302 Found` (or `307 Temporary Redirect`) for temporary moves.

### 4. Ignoring the 502/504 distinction
A `502 Bad Gateway` means the server acting as a proxy received an invalid response from the upstream server. A `504 Gateway Timeout` means the upstream server didn't respond in time. Distinguishing these is critical for infrastructure debugging.

## Use cases

*   **Software Development:** Selecting the correct response code for an Express, Go, or Python web server.
*   **QA Engineering:** Verifying that a web application returns the expected status code for specific failure scenarios (e.g., checking if an expired token returns 401).
*   **SEO Analysis:** Understanding how `301` vs `302` redirects affect search engine indexing and "link juice."
*   **DevOps:** Configuring health checks for load balancers that look for specific `200` or `204` responses.
*   **Technical Writing:** Ensuring documentation accurately describes the errors an API might return.

## Related tools

*   **JSON Viewer:** Useful for inspecting the response bodies that often accompany 4xx and 5xx error codes.
*   **URL Parser:** Helps in debugging `400` or `404` errors caused by malformed URLs or incorrect query parameters.
*   **JWT Parser:** Essential for debugging `401 Unauthorized` errors when using JSON Web Tokens for authentication.
*   **CURL Command Generator:** A great companion for testing how a server responds to different headers and methods.
