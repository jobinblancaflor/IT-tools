# TOML to JSON Converter

## What it does
This tool parses a TOML document and outputs the equivalent JSON, indented for readability. If the TOML is invalid, a message explains that it could not be parsed and no output is shown.

## Why someone uses it
- Feeding configuration written in TOML (Rust's `Cargo.toml`, Python's `pyproject.toml`, Hugo and many other tools) into a system that expects JSON.
- Inspecting how nested TOML tables and arrays are actually structured.
- Validating a TOML file by seeing whether it parses.
- Converting configs while migrating between tools.

## Step-by-step instructions
1. Paste your TOML into the left input.
2. The JSON appears in the right output as soon as the TOML is valid.
3. Copy the JSON, or fix the highlighted validation error and try again.

## Examples
Input:
```toml
title = "Example"

[owner]
name = "Sam"

[[servers]]
host = "alpha"
port = 8080
```
Output (shape): an object with `title`, an `owner` object containing `name`, and a `servers` array whose first element is `{ "host": "alpha", "port": 8080 }`.

## Understanding the results
TOML tables (`[owner]`) become JSON objects. Arrays of tables (`[[servers]]`) become JSON arrays of objects. Strings, integers, floats and booleans map directly. TOML has dedicated date and time types, which JSON does not; these are emitted as strings in ISO 8601 form. Comments in the TOML are dropped because JSON has no comment syntax. Key order is preserved as written.

## FAQs
- **Is the conversion lossless?** For data, yes; comments and formatting are lost, and date types become strings.
- **Why do I get no output?** The input is likely invalid TOML, for example an unquoted string value or a duplicate key.
- **Can I convert JSON back to TOML?** Use the JSON to TOML tool.
- **Is my config uploaded?** No, parsing runs in your browser.

## Common mistakes
- Forgetting quotes around string values (`name = Sam` is invalid).
- Redefining the same table or key twice.
- Expecting comments to survive the conversion.
- Assuming a date value stays a native date type in JSON.

## Use cases
- Reading a `pyproject.toml` programmatically with tools that only understand JSON.
- Comparing TOML and JSON versions of the same config.
- Learning TOML syntax by seeing its data structure.
- Migrating settings between frameworks.

## Related tools
- **JSON to TOML:** Convert in the opposite direction.
- **TOML to YAML:** Move TOML configs into YAML.
- **JSON Viewer:** Format and explore the resulting JSON.
