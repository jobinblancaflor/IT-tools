# Spec: AdSense Value Recovery (EEAT Focus)

## Objective
Transform ArmyTool from a "thin" utility site to a high-value technical resource. Establish authority in Cybersecurity, Web Dev, and DevOps to pass Google AdSense "Low Value Content" review.

## Tech Stack
Vue 3, UnoCSS, Markdown (`vite-plugin-vue-markdown`).

## Commands
Dev: `npm run dev`
Build: `npm run build`

## Project Structure
`src/blogs/` → Long-form authority articles (Topic Clusters).
`src/tools/[tool-name]/details.md` → Deep-dive tool guides.
`src/pages/` → Enhanced `/about` (Expertise), `/contact`, and Legal pages.

## Code Style
- Semantic HTML (H1-H4 hierarchy).
- Interlinking: Tool $\leftrightarrow$ Blog.
- Content: Professional, technical, problem-solving tone.

## Testing Strategy
- Word Count: Main articles > 800 words.
- Uniqueness: No generic AI fillers; specific use-cases for Low-Code/Automation.
- SEO: Unique meta tags, structured data (JSON-LD) for articles.

## Boundaries
- **Always:** Reference real-world scenarios. Use internal links.
- **Ask first:** New dependencies for SEO/Analytics.
- **Never:** Keyword stuffing or low-quality "filler" posts.

## Success Criteria
- [ ] **Expert Profile:** `/about` page detailing experience as Web Dev, Low Coder, and Automation Expert.
- [ ] **Topic Clusters:** 3 clusters (Cybersecurity, Web Dev, DevOps) with 3-4 deep articles each (> 800 words).
- [ ] **Tool Authority:** 10+ tools updated with "Advanced Usage" and "Common Pitfalls" (details.md).
- [ ] **Internal Mesh:** Every tool links to related authority content; every article links to tools.
- [ ] **Trust Signals:** Professional footer, clear site map, and updated legal/privacy policies.

## Open Questions
- None. (Identity and niche confirmed).
