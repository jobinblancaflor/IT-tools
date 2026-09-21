# Text Diff

## What it does
Text Diff places two pieces of text side by side and highlights exactly what was added, removed or changed between them. Paste the original on one side and the modified version on the other; differences are marked line by line and, within changed lines, character by character.

## Why someone uses it
- Confirming what actually changed between two versions of a configuration file before deploying.
- Comparing a contract, policy or article draft with the revised copy.
- Spotting a stray character in a long token, hash or connection string.
- Reviewing output from two runs of the same script to see what differs.

## Step-by-step instructions
1. Paste the original text into the left pane.
2. Paste the changed text into the right pane.
3. Scan the highlighted lines. Removed content is marked on the left, added content on the right.
4. Edit either pane and the comparison updates live.

## Examples
Left: `timeout = 30` / `retries = 3`
Right: `timeout = 60` / `retries = 3` / `debug = true`

The diff flags line 1 as changed (30 → 60), shows line 2 as identical, and shows line 3 as an addition.

## Understanding the results
Unhighlighted lines are identical on both sides. Highlighted lines differ; inside those lines, the exact characters that changed are emphasised so you do not have to hunt for a single altered digit. A line that appears only on one side was inserted or deleted. Diffs are computed on the text as given, so differences in trailing spaces, tabs versus spaces, or Windows (CRLF) versus Unix (LF) line endings will show up as changes even though they look the same on screen.

## FAQs
- **Is my text uploaded?** No. The comparison happens in your browser, so it is safe to compare internal configs, though you should still avoid pasting live secrets on shared screens.
- **Can it compare files?** Copy the contents of the files into the panes; the tool works on pasted text.
- **Can it ignore whitespace?** Not as a toggle; normalise whitespace first if it is noise for you.
- **How large a text can it handle?** Several thousand lines is comfortable; extremely large inputs may slow the browser.

## Common mistakes
- Pasting the versions into the wrong panes and reading additions as deletions.
- Missing invisible differences such as trailing spaces or mixed line endings, then wondering why identical-looking lines are flagged.
- Comparing structured data (JSON, XML) that has different formatting but the same content. Format both first with the JSON Viewer or XML Formatter, or use JSON Diff for JSON.

## Use cases
- Code review of small snippets outside a version-control system.
- Proofreading edits from an editor or client.
- Verifying that a migrated config matches the source.
- Teaching what a diff is and how change tracking works.

## Related tools
- **JSON Diff:** Compare JSON semantically, ignoring key order and whitespace.
- **XML Formatter:** Normalise XML before diffing it.
- **Text Statistics:** Compare character and word counts of two versions.
