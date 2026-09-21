# YAML to TOML Converter

## What it does
This tool converts a YAML document into TOML. Paste YAML on the left and the TOML equivalent appears on the right, ready to copy into a file such as `pyproject.toml` or a Cargo manifest.

## Why someone uses it
- Moving configuration from a YAML-based tool to one that uses TOML.
- Comparing how the same structure is expressed in both formats.
- Checking that YAML parses before converting it.
- Learning TOML syntax by example.

## Step-by-step instructions
1. Paste your YAML into the input.
2. If validation fails, correct the YAML (usually indentation).
3. Copy the TOML from the output.

## Examples
Input:
```yaml
title: Example
owner:
  name: Sam
servers:
  - host: alpha
    port: 8080
```
Output (shape): `title = "Example"`, a `[owner]` table with `name = "Sam"`, and a `[[servers]]` array-of-tables entry with `host` and `port`.

## Understanding the results
YAML mappings become TOML tables, and lists of mappings become arrays of tables written with double brackets. Simple lists become TOML arrays. TOML requires that the document root be a table, so a YAML file whose top level is a list or a single value cannot be converted. TOML also has no null value; YAML `null` entries cannot be represented and may cause an error or be dropped. Comments and anchors in the YAML do not appear in the output; aliases are expanded.

## FAQs
- **Why is there no output?** The YAML may be invalid, or it may contain something TOML cannot express, such as a `null` value or a non-mapping root.
- **Are comments kept?** No.
- **Are types preserved?** Numbers, booleans and strings are; YAML's implicit typing decides which is which.
- **Is my YAML uploaded?** No, it is converted in your browser.

## Common mistakes
- Trying to convert a top-level list.
- Leaving `null` or empty values in the YAML.
- Mixed-type arrays, which older TOML versions do not permit.
- Indenting with tabs, which YAML rejects.

## Use cases
- Porting settings into Python or Rust project configuration.
- Migrating static-site generator config.
- Producing TOML examples for documentation.
- Auditing differences between config formats.

## Related tools
- **TOML to YAML:** The reverse conversion.
- **YAML to JSON:** See the data as JSON first.
- **YAML Viewer:** Clean up messy YAML before converting.
