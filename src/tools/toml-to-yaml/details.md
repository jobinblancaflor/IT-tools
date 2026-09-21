# TOML to YAML Converter

## What it does
This tool reads a TOML document and writes out the same data as YAML. Paste TOML on the left and the YAML equivalent appears on the right. Invalid TOML is flagged and produces no output.

## Why someone uses it
- Moving settings from a TOML-based tool into a YAML-based one, such as Kubernetes, GitHub Actions, Docker Compose or Ansible.
- Comparing how the same data looks in each format.
- Checking that a TOML file parses correctly before using it.
- Learning YAML by converting TOML you already understand.

## Step-by-step instructions
1. Paste your TOML into the input.
2. Fix any "Provided TOML is not valid" message.
3. Copy the YAML from the output.

## Examples
Input:
```toml
name = "demo"

[database]
host = "localhost"
ports = [5432, 5433]
```
Output:
```yaml
name: demo
database:
  host: localhost
  ports:
    - 5432
    - 5433
```

## Understanding the results
Tables become nested mappings, and TOML arrays become YAML sequences with a dash for each item. YAML relies on indentation, so nesting depth shows as indentation rather than as `[section.headers]`. Strings that could be confused with other types (for example `"true"` or `"123"`) may be quoted in the output so their type is preserved. Comments in the TOML are not carried over, and TOML date-times are written as timestamps.

## FAQs
- **Will the YAML behave identically to the TOML?** The data is equivalent; how your application reads it depends on the application.
- **Are comments kept?** No. Add them again by hand after converting.
- **Why is my YAML quoted in places?** To keep strings that look like numbers or booleans as strings.
- **Is anything sent to a server?** No, this runs in your browser.

## Common mistakes
- Pasting a partial table without its header and expecting the nesting to be reconstructed.
- Assuming the key order of a large table will match your preference; it follows the parsed order.
- Editing the YAML with tabs; YAML requires spaces for indentation.

## Use cases
- Migrating application settings to a container platform.
- Turning a package manifest into configuration for CI.
- Producing YAML samples for documentation.
- Auditing configs across different tooling ecosystems.

## Related tools
- **YAML to TOML:** Convert back to TOML.
- **TOML to JSON:** Get the same data as JSON.
- **YAML Viewer:** Tidy and sort the generated YAML.
