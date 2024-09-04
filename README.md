# CurlyBlocks - Auto Add Curly Braces to Code Blocks

## Description
CurlyBlocks is a VSCode extension that automatically adds curly braces to control structures like `if`, `else`, `for`, `while`, and `try...catch` that are missing them. It improves code consistency and reduces the chances of errors by ensuring that all code blocks are properly enclosed in curly braces.

## Features
- Automatically adds curly braces to `if`, `else`, `for`, `while`, and `try...catch` statements without braces.
- Works with both single-line and multi-line code blocks.
- Supports JavaScript, TypeScript, and other C-style languages.
- Keyboard shortcut to quickly format the current document or selection.

## Usage
- After installing the extension, open a file with control structures that don't have curly braces.
- Run the command: `CurlyBlocks: Format Document`.
- You can also trigger the command using the default keyboard shortcut: `Ctrl+Shift+C` (Windows/Linux) or `Cmd+Shift+C` (macOS).

Example:
```javascript
// Before:
if (x > 0) console.log(x);

// After:
if (x > 0) {
    console.log(x);
}
