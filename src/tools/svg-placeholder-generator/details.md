# SVG Placeholder Generator

## What it does
The SVG Placeholder Generator is a versatile design utility that creates lightweight, customizable image placeholders on the fly. You can define exact dimensions, colors, and text to match your project's needs. The tool generates raw SVG code, a Base64 string for direct embedding, and allows you to download the final result as a `.svg` file.

## Why someone uses it
- **Layout Mockups:** Filling empty spaces in a website design before the actual images or photography are ready.
- **Responsive Testing:** Creating images of various aspect ratios to see how a layout behaves on different screen sizes.
- **Design Consistency:** Ensuring all placeholders in a prototype share the same aesthetic (e.g., specific brand colors).
- **Performance:** SVG placeholders are incredibly small (usually under 1KB), making them perfect for fast-loading wireframes and email templates.

## Step-by-step instructions
1. **Define Dimensions:** Enter the **Width** and **Height** in pixels.
2. **Customize Colors:** Use the color pickers to set the **Background** and **Text color**.
3. **Adjust Typography:** Set the **Font size** to ensure the label is readable.
4. **Custom Label:** Enter text in the **Custom text** field. If left blank, it will show the image dimensions (e.g., "800x600").
5. **Set Scaling:** Toggle **Use exact size** if you need the SVG to have fixed pixel dimensions in the code.
6. **Export:**
   - Copy the **SVG HTML element** to paste directly into your HTML/CSS.
   - Copy the **Base64** string for use in `img src="...""` tags.
   - Click **Download svg** to save the file.

## Examples
- **Thumbnail Placeholder:** 150x150, Grey background, No custom text (shows "150x150").
- **Blog Hero:** 1200x600, Dark blue background, White text: "Blog Featured Image".
- **Avatar Mock:** 64x64, Circle background (simulated), "User".

## FAQs
- **Are these images "real" files?** Yes, once downloaded, they are standard Scalable Vector Graphics (.svg) files that can be opened in any browser or design tool like Figma or Adobe Illustrator.
- **Why use SVG instead of PNG for placeholders?** SVGs are text-based, meaning they are much smaller than PNGs and can be scaled infinitely without losing quality.
- **Can I change the font?** The tool uses a clean `monospace` font by default to ensure it looks the same on every device and doesn't require extra font files to load.

## Common mistakes
- **Contrast Ratios:** Selecting a background and text color that are too similar, making it hard to see the dimensions or label.
- **Font Overflow:** Entering too much text for a small image size, which may cause the text to be cut off or overlap the edges.

## Use cases
- **Web Development:** Speeding up the development of new pages by using placeholders for non-existent assets.
- **Presentation Slides:** Using placeholders to show where images will be placed in a pitch deck.
- **Email Templates:** Creating ultra-lightweight images that aren't blocked by most email clients' default "hide images" settings.

## Related tools
- **Lorem Ipsum Generator:** For generating placeholder text to go along with your placeholder images.
- **Color Converter:** For finding the exact color codes to match your project's brand.
- **Case Converter:** To quickly format your custom labels into Uppercase or Title Case.
