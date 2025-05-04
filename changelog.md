CHANGELOG

<!-- {% raw %} -->

## [v0.2.0] - 2025-05-03

### Fixed
- Escaped all `{{...}}` macro syntax in script.js to prevent Jekyll Liquid parsing errors during GitHub Pages deployment
- Specifically addressed `{SHIFT}`, `{Enter}`, and `{oem_3}` macros by breaking double braces using JS string concatenation
- Ensured all macro logic remains functionally correct and unchanged for runtime output

### Added
- Inline comments to clarify each Jekyll-safe workaround for future maintenance

## [v0.1.0] - 2025-05-02

### Fixed
- Refactored generateMacro() to wrap capital letters in a single macro block using {{SHIFT}{x}} for reliable in-game detection
- Adjusted conditional logic to improve clarity and prevent improper Shift behavior
- Verified and unified charMap entries with consistent single-brace formatting
- Confirmed macro generation now distinguishes capital letters without sticking Shift or producing unintended characters
- Validated syntax and resolved prior nesting issues in macro generation loop
- Converted all double-braced macro entries ({{KEY}}) to single-brace format ({KEY}) for consistency
- Corrected function key mappings (F1–F24) with accurate {fX} values
- Updated special and modifier keys to match new single-brace macro format
- Preserved legacy formatting for known exceptions (e.g., {{oem_3}} where needed)

<!-- {% endraw %} -->
