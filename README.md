# CSharpFix

An OpenClaw plugin for diagnosing and fixing common C# compiler errors.

Created by **Riya Verma**.

CSharpFix ships a curated database of 25+ common C# compiler errors (CS*xxxx* codes), each with explanations, suggested fixes, before/after examples, and links to official Microsoft documentation. It integrates with OpenClaw as agent tools, a CLI subcommand, and an automatic error detection hook.

## Installation

```bash
# From the OpenClaw plugin registry
openclaw plugin install csharpfix

# Or manually
cd CSharpFix
npm install
npm run build
```

## Error Categories

| Category    | Description                                    | Examples                       |
|-------------|------------------------------------------------|--------------------------------|
| `type`      | Type mismatch and conversion errors            | CS0029, CS0165, CS0428, CS0535 |
| `null`      | Nullable reference type warnings               | CS8600, CS8602, CS8604         |
| `async`     | Async/await usage errors                       | CS4033                         |
| `linq`      | LINQ-related errors                            | —                              |
| `syntax`    | Syntax and structure errors                    | CS0161, CS0501, CS0542, CS1001 |
| `access`    | Member access and visibility errors            | CS0117, CS0120, CS1061, CS1929 |
| `generic`   | Generic type argument errors                   | CS0411                         |
| `cast`      | Explicit cast and conversion errors            | CS0266                         |
| `namespace` | Using directives and namespace resolution      | CS0103, CS0234, CS0246         |
| `misc`      | Miscellaneous errors                           | CS0619                         |

## Agent Tools

CSharpFix registers three tools for use by OpenClaw agents:

### `csharp_fix`
Paste raw compiler output and get diagnostics for every error detected.

### `csharp_explain`
Look up a specific error code (e.g. `CS0029`) to get a detailed explanation, suggested fixes, and code examples.

### `csharp_errors`
List all known errors, optionally filtered by category.

## Auto-Detection

CSharpFix registers an `after_tool_call` hook that watches for C# compiler error patterns (`error CS\d{4}`) in tool output. When detected, it automatically appends diagnostics and fix suggestions — no manual invocation needed.

## CLI

```bash
# List all known errors
openclaw csharpfix errors

# List errors in a specific category
openclaw csharpfix errors null

# Look up a specific error
openclaw csharpfix lookup CS0029

# List all categories
openclaw csharpfix categories
```

## Testing

```bash
npm test
```

Tests cover:
- Error database integrity (25+ entries, all required fields, no duplicates)
- Compiler output parsing (MSBuild, dotnet build, simple formats)
- Markdown formatting (single result, error list, multiple results)

## Project Structure

```
CSharpFix/
├── index.ts                   # Plugin entry point
├── openclaw.plugin.json       # Plugin manifest
├── package.json
├── tsconfig.json
└── src/
    ├── types.ts               # TypeScript interfaces
    ├── errors.ts              # Error database (25+ entries)
    ├── parser.ts              # Compiler output parser
    ├── formatter.ts           # Markdown formatter
    ├── cli.ts                 # CLI subcommand handler
    └── __tests__/
        ├── errors.test.ts
        ├── parser.test.ts
        └── formatter.test.ts
```

## License

MIT
