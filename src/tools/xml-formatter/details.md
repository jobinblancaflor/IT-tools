# XML Formatter

## What it does
The XML Formatter takes minified or messy XML and rewrites it with consistent line breaks and indentation, so the hierarchy of elements is easy to read. It also tells you whether your XML is well-formed. You can choose the indent size (0–10 spaces) and whether short text content should stay on the same line as its tag.

## Why someone uses it
- Reading a single-line XML response from a SOAP service, an RSS feed or a sitemap.
- Cleaning up configuration files (Maven, Android, .NET) before committing them.
- Spotting a missing closing tag in a large document.
- Preparing XML for documentation or a bug report.

## Step-by-step instructions
1. Paste XML into the input. A short example is pre-filled.
2. Set *Indent size*.
3. Choose whether to *Collapse content*, which keeps `<a>text</a>` on one line.
4. Copy the formatted result from the output.

## Examples
Input: `<hello><world>foo</world><world>bar</world></hello>`

Output with 2-space indent:
```xml
<hello>
  <world>foo</world>
  <world>bar</world>
</hello>
```

## Understanding the results
Each nested element is indented one level deeper than its parent, so you can read the tree from left to right. With *Collapse content* on, elements containing only text stay on one line; with it off, the text sits on its own indented line. Formatting changes only whitespace between elements, not element names, attributes or text values. If the input is not well-formed (an unclosed tag, mismatched names, unescaped `&` or `<`), the tool shows "Provided XML is not valid." instead of output.

## FAQs
- **Does it validate against a schema?** No. It checks that the XML is well-formed, not that it conforms to an XSD or DTD.
- **Will formatting change my data?** Not the data, but whitespace-sensitive content can be affected, so be careful with mixed-content documents.
- **Are my settings remembered?** Yes, indent size and collapse choice are saved in your browser.
- **Is the XML uploaded?** No, it is processed locally.

## Common mistakes
- Leaving an unescaped ampersand (`&` should be `&amp;`).
- Mismatched tag case; XML is case-sensitive, so `<Item></item>` is invalid.
- Multiple root elements in one document.
- Expecting the tool to fix invalid XML rather than report it.

## Use cases
- Debugging API integrations.
- Reviewing generated sitemaps and feeds.
- Standardising config-file style across a team.
- Teaching XML structure.

## Related tools
- **XML to JSON:** Convert the document to JSON.
- **JSON to XML:** Build XML from JSON.
- **Text Diff:** Compare two versions of an XML document after formatting.
