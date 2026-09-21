# Text to Binary

## What it does
This tool converts plain text into its binary representation, one 8-bit group per character, and converts binary back into readable text. Both directions live on the same page so you can check a round trip.

## Why someone uses it
- Learning how computers store characters as numbers and bits.
- Solving puzzles, CTF challenges and geocaching clues that hide messages in binary.
- Producing binary strings for teaching materials or documentation.
- Decoding a stray string of 0s and 1s back into words.

## Step-by-step instructions
1. **Text to binary:** type or paste text into the first card. The binary appears below it. Use *Copy binary to clipboard* to copy it.
2. **Binary to text:** paste groups of 8 bits (spaces between groups are fine) into the second card. The decoded text appears below.
3. If the binary card shows a validation error, check that the total number of bits is a multiple of 8.

## Examples
- `Hi` → `01001000 01101001`
- `A` → `01000001`
- `01001000 01100101 01101100 01101100 01101111` → `Hello`
- `123` → `00110001 00110010 00110011` (the *characters* "1", "2", "3", not the number 123).

## Understanding the results
Each character is looked up in the ASCII table and written as an 8-bit binary number. Uppercase "A" is decimal 65, which is `01000001` in binary; lowercase "a" is 97, `01100001`. The two differ by a single bit (the third from the left), which is why case is easy to flip in low-level code. Bits are read from left (most significant) to right (least significant). When decoding, each 8-bit group is converted back to its decimal value and then to the matching character.

## FAQs
- **Does it support emoji or accented letters?** It is designed for ASCII text. Characters outside the ASCII range will not round-trip the way plain letters do.
- **Do the spaces between bytes matter?** They are for readability; the decoder needs the total bit count to be a multiple of 8.
- **Is binary a form of encryption?** No. It is just another way of writing the same data, and anyone can decode it.
- **Is my text sent anywhere?** No, conversion runs in your browser.

## Common mistakes
- Dropping a leading zero. `1001000` is 7 bits; the full byte is `01001000`.
- Mixing up converting a *number* to binary with converting the *text* of that number.
- Pasting binary with extra characters (commas, letters) and getting a validation error.

## Use cases
- Computer science classes covering data representation.
- Capture-the-flag and puzzle solving.
- Debugging low-level protocols where you inspect raw bits.
- Creating novelty messages in binary.

## Related tools
- **Integer Base Converter:** Convert numbers between binary, decimal, hex and more.
- **Text to Unicode:** Get numeric character codes for text.
- **Base64 String Converter:** A more compact text-safe encoding for binary data.
