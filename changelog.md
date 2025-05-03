CHANGELOG

Version: 0.1.0 Date: 5/2/25

Refactored generateMacro() to wrap capital letters in a single macro block using {{SHIFT}{x}} for reliable in-game detection

Adjusted conditional logic to improve clarity and prevent improper Shift behavior

Verified and unified charMap entries with consistent single-brace formatting

Confirmed macro generation now distinguishes capital letters without sticking Shift or producing unintended characters

Validated syntax and resolved prior nesting issues in macro generation loop

Converted all double-braced macro entries ({{KEY}}) to single-brace format ({KEY}) for consistency

Corrected function key mappings (F1–F24) with accurate {fX} values

Updated special and modifier keys to match new single-brace macro format

Preserved legacy formatting for known exceptions (e.g., {{oem_3}} where needed)

Confirmed consistency across control, arrow, numpad, and media keys
