# YAML to JSON Converter

## What it does
This tool parses YAML and outputs the same data as indented JSON. Paste your YAML into the left panel and the JSON appears on the right. YAML merge keys (`<<`) are resolved, and invalid YAML is reported instead of producing output.

## Why someone uses it
- Sending configuration from Kubernetes manifests, CI pipelines or Docker Compose files to tools and APIs that require JSON.
- Checking exactly what data type YAML assigned to each value.
- Finding indentation problems by seeing whether a file parses.
- Learning how YAML structures map to JSON objects and arrays.

## Step-by-step instructions
1. Paste your YAML into the input.
2. Resolve any "Provided YAML is not valid" message.
3. Copy the JSON from the output.

## Examples
Input:
```yaml
name: demo
replicas: 3
enabled: true
tags:
  - web
  - api
```
Output: an object with `"name": "demo"`, `"replicas": 3` (a number), `"enabled": true` (a boolean) and a `"tags"` array of two strings.

## Understanding the results
Mappings become objects, sequences (dash lists) become arrays, and scalars are typed automatically: `3` is a number, `true` is a boolean, `null` or `~` becomes `null`. Anchors and aliases (`&base`, `*base`) and merge keys are expanded so the JSON contains the full values. Comments are removed. If the document is empty, no output is shown.

## FAQs
- **Why did my value become a number or boolean?** YAML infers types. Quote a value (`"3"`, `"yes"`) to keep it a string.
- **Does it handle multiple documents (`---`)?** This tool is built for a single document.
- **Are comments preserved?** No; JSON does not support them.
- **Is the YAML uploaded?** No, conversion happens in your browser.

## Common mistakes
- Using tabs for indentation; YAML requires spaces.
- Unquoted values such as `no`, `on` or `1.10` being interpreted as booleans or numbers, so `1.10` becomes `1.1`.
- Misaligned list items that silently change the nesting.
- Duplicate keys within one mapping.

## Use cases
- Feeding a Kubernetes or CI config to a JSON-only validator.
- Generating JSON fixtures from readable YAML.
- Debugging unexpected type coercion in configuration.
- Documentation and teaching.

## Related tools
- **JSON to YAML:** Convert back to YAML.
- **YAML Viewer:** Format and sort YAML.
- **JSON Viewer:** Format and explore JSON output.
