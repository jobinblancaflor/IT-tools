# JSON Viewer: Professional JSON Formatting & Analysis Tool

The JSON Viewer is a high-performance utility designed for developers and system administrators to transform raw, minified, or malformed JSON data into a human-readable, structured format. Unlike standard prettifiers, it implements the **JSON5** specification, allowing it to handle more flexible syntax and provide a robust debugging experience for complex data structures.

## 1. What the Tool Does
The JSON Viewer parses raw text input and converts it into a formatted JSON string. Its core functionality includes:
- **JSON5 Parsing**: Supports comments, trailing commas, and unquoted keys, making it compatible with a wider range of configuration files.
- **Recursive Key Sorting**: Implements a deep-sorting algorithm that alphabetically organizes keys across all nested objects and arrays.
- **Customizable Indentation**: Allows precise control over the visual nesting depth (0-10 spaces).
- **Real-time Validation**: Provides immediate feedback on syntax errors using a validation engine.
- **Persistence**: Utilizes local storage to remember your preferences (indent size, sort toggle) and the last processed payload across sessions.

## 2. Why Someone Uses It
Developers and sysadmins typically use this tool when dealing with:
- **API Debugging**: Analyzing minified responses from REST or GraphQL endpoints where the structure is too deep to read in a raw terminal.
- **Configuration Audit**: Reviewing `.json5` or `.json` config files where key order is critical for auditing changes.
- **Payload Normalization**: Standardizing the format of JSON blobs before committing them to version control to avoid "noisy" diffs caused by inconsistent indentation.
- **Malformed Data Recovery**: Using the JSON5 parser to read data that might have trailing commas or missing quotes, which would cause `JSON.parse()` to fail in a standard JS environment.

## 3. Step-by-Step Instructions

### Basic Usage
1. **Input Data**: Paste your raw JSON string into the "Your raw JSON" textarea.
2. **Configure Formatting**:
   - Toggle **Sort keys** to organize the data alphabetically.
   - Adjust the **Indent size** numeric input to set the preferred nesting spacing.
3. **Review Output**: The "Prettified version" area updates instantly with the formatted result.
4. **Copy Result**: Use the integrated copy button to move the formatted JSON back into your editor or API client.

### Advanced Usage: Normalizing Large Payloads
For professional workflows involving large datasets:
1. **Enable Key Sorting**: Turn on "Sort keys". This ensures that two JSON objects with the same data but different key orders are rendered identically.
2. **Set Consistent Indentation**: Set a project-standard indent (e.g., 2 or 4).
3. **Validation Check**: If the "Provided JSON is not valid" error appears, check for non-JSON5 compatible characters or incomplete brackets.
4. **Diff Preparation**: Copy the sorted, prettified output into a temporary file to perform a clean `git diff` or `vimdiff` against another version.

## 4. Examples

### Example 1: Minified API Response
**Input:**
`{"id":1,"name":"Prod_A","meta":{"tags":["web","api"],"version":1.2},"status":"active"}`

**Output (Sort Keys: On, Indent: 3):**
```json
{
   "id": 1,
   "meta": {
      "tags": [
         "web",
         "api"
      ],
      "version": 1.2
   },
   "name": "Prod_A",
   "status": "active"
}
```

### Example 2: JSON5 with Trailing Commas (Flexible Parsing)
**Input:**
```json
{
  name: "DevServer",
  ports: [80, 443,], // Note the trailing comma and missing quotes on key
}
```
**Result:** The tool successfully parses this via JSON5 and outputs a standard, valid JSON string.

## 5. FAQs
**Q: Does this tool send my data to a server?**
A: No. All parsing, sorting, and formatting occur locally in the browser using client-side JavaScript.

**Q: Why is the "Sort keys" option useful?**
A: In large JSON objects, finding a specific key is difficult if they are unordered. Sorting them alphabetically makes the document predictable and searchable.

**Q: What is the difference between JSON and JSON5?**
A: JSON5 is a superset of JSON that allows for comments, trailing commas, and single-quoted strings, making it much friendlier for humans writing configuration files.

## 6. Common Mistakes
- **Ignoring Validation Errors**: Trying to copy the output while the "Provided JSON is not valid" warning is active; the output will be empty or outdated until the syntax is corrected.
- **Over-indenting**: Setting the indent size to 10 for deeply nested objects, which can lead to excessive horizontal scrolling.
- **Assuming Standard JSON**: Attempting to paste highly non-standard text that isn't even JSON5 (e.g., YAML or XML) and expecting it to format.

## 7. Use Cases (Professional/Industrial)
- **SRE/DevOps**: Quickly analyzing `cluster-info` or `describe` outputs from Kubernetes (which are often massive JSON blobs) to find specific resource limits or status codes.
- **Frontend Engineering**: Formatting state dumps from Redux or Vuex stores to debug complex state transitions during a session.
- **Backend Integration**: Normalizing third-party API responses before generating TypeScript interfaces from the JSON samples.
- **CI/CD Pipeline Debugging**: Formatting JSON logs from GitHub Actions or GitLab CI to identify failed step parameters.

## 8. Related Tools
- **`jq`**: The industry-standard CLI tool for JSON processing (ideal for shell scripting).
- **Postman/Insomnia**: API clients with built-in prettifiers (ideal for request/response cycles).
- **JSONLint**: A strict JSON validator (ideal for ensuring strict adherence to RFC 8259).
- **Prettier**: An opinionated code formatter (ideal for project-wide style enforcement).
