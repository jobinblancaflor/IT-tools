# XML to JSON Converter

## What it does
This tool converts an XML document into JSON. Paste XML on the left; a JSON representation appears on the right, using the compact structure of the `xml-js` library. Malformed XML is reported and produces no output.

## Why someone uses it
- Consuming an older XML-based API from modern JavaScript code that prefers JSON.
- Exploring the structure of a large XML file as a tree of objects.
- Migrating data from XML exports into a JSON-based store.
- Quickly checking how attributes and text are represented.

## Step-by-step instructions
1. Paste your XML into the input (a sample `<a x="1.234" y="It's"/>` is pre-filled).
2. Check there is no "Provided XML is not valid" message.
3. Copy the JSON from the output.

## Examples
Input: `<a x="1.234" y="It's"/>`

Output:
```json
{
  "a": {
    "_attributes": {
      "x": "1.234",
      "y": "It's"
    }
  }
}
```

## Understanding the results
The conversion uses a compact format with conventions you need to know when reading the JSON: attributes are grouped under `_attributes`, text inside an element appears under `_text`, CDATA under `_cdata`, and comments under `_comment`. Repeated sibling elements with the same name become an array, while a single element stays an object, so the type of a field can change depending on how many times it appears. All attribute values are strings, even numeric-looking ones such as `"1.234"`; convert them in your code if you need numbers.

## FAQs
- **Is the mapping standardised?** No. There is no single official XML-to-JSON mapping; this tool follows the `xml-js` compact convention.
- **Why is a number a string?** XML has no number type; everything is text.
- **Can I convert back?** Use JSON to XML, though a round trip may not match this exact structure.
- **Is my XML uploaded?** No, parsing happens in your browser.

## Common mistakes
- Assuming a repeated element is always an array; a single occurrence is an object.
- Ignoring namespaces and prefixes; they are kept as part of the names.
- Feeding invalid XML (unclosed tags, unescaped `&`).
- Forgetting that comments and processing instructions may appear in the output.

## Use cases
- Wrapping legacy SOAP or RSS data for a JavaScript front end.
- Data migration and ETL scripts.
- Learning how XML nesting maps to objects.
- Preparing test fixtures from XML samples.

## Related tools
- **JSON to XML:** Go the other way.
- **XML Formatter:** Tidy the XML before converting.
- **JSON Viewer:** Explore the resulting JSON.
