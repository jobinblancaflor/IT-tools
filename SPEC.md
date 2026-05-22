# Spec: Armytool Enhancements

## Objective
Enhance Armytool with standardized tool content, better navigation, SEO-optimized blogs, an FAQ section on the home page, a PWA install prompt, and essential legal/contact pages.

### User Stories
- As a user, I want a comprehensive guide for each tool, including how to use it and common mistakes.
- As a user, I want to easily access the blog from any page.
- As a user, I want to find answers to common questions on the home page.
- As a user, I want to contact the maintainer for support or feedback.
- As a user, I want to install the app on my device easily.
- As a user, I want to see legal information (Privacy, Terms, etc.) to trust the tool.
- As a site owner, I want more SEO-friendly content to drive traffic to specific tools.

## Standardized Tool Content
Every tool page (`src/tools/*`) will now include a detailed section below the tool itself with the following parts:
1. **What the tool does**
2. **Why someone uses it**
3. **Step-by-step instructions**
4. **Examples**
5. **FAQs**
6. **Common mistakes**
7. **Use cases**
8. **Related tools**

*Implementation Note:* This content will be stored in `src/tools/[tool-name]/details.md` and dynamically rendered in `tool.layout.vue`.

## New Pages
- **Contact Page:** `/contact` - Simple contact information and a button/link to the Google Form: https://forms.gle/RTqr2ZUrKosiQ4sr8
- **Privacy Policy:** `/privacy-policy`
- **Terms of Service:** `/terms-of-service`
- **Disclaimer:** `/disclaimer`
- **Cookie Policy:** `/cookie-policy`

## Tech Stack
- **Framework:** Vue 3 (Composition API)
- **UI Library:** Naive UI
- **Styling:** UnoCSS (Tailwind-compatible) and Less
- **State Management:** Pinia
- **I18n:** vue-i18n
- **PWA:** vite-plugin-pwa
- **Head Management:** @vueuse/head
- **Markdown Rendering:** `vite-plugin-vue-markdown` (already in use)

## Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Lint:** `npm run lint`

## Project Structure
- `src/blogs/`: Markdown files for blog posts.
- `src/tools/[tool-name]/details.md`: Detailed documentation for each tool.
- `src/pages/`: Vue components for main pages (Home, Blogs, Contact, Legal).
- `src/layouts/`: Layout components (Base, Tool).
- `src/components/`: Reusable UI components.
- `locales/`: I18n YAML files.

## Success Criteria
- [x] **Standardized Tool Content:** At least 5 major tools have the new 8-section detailed content implemented.
- [x] **Tool Layout:** `tool.layout.vue` updated to render `details.md` if available.
- [x] **Navigation:** "Blogs" link added to the top navbar.
- [x] **FAQ on Home:** FAQ section added to `Home.page.vue`.
- [x] **Contact Page:** Functional `/contact` page.
- [x] **Legal Pages:** All 4 legal pages created and linked in the footer.
- [x] **New Blogs:** At least 5 new SEO-optimized blog posts created.
- [x] **PWA Install Prompt:** Functional popup/banner to prompt installation.

## Open Questions
1. **FAQ Content:** I'll provide a draft for the Home page FAQ. Are you okay with that?
2. **Legal Content:** I'll use standard templates for Privacy, Terms, etc. Is that acceptable?
3. **Contact Form:** Should I use a simple `mailto:` or a form service like Netlify/Formspree?
