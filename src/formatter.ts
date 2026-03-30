import { FixResult, CSharpError } from "./types.js";

export function formatFixResult(result: FixResult): string {
  const { parsed, knownError } = result;
  const lines: string[] = [];

  lines.push(`## ${parsed.severity.toUpperCase()} ${parsed.code}`);
  lines.push("");

  if (parsed.file !== "<unknown>" && parsed.file !== "<lookup>") {
    lines.push(
      `**Location:** \`${parsed.file}\` (line ${parsed.line}, col ${parsed.column})`
    );
    lines.push("");
  }

  lines.push(`**Message:** ${parsed.message}`);
  lines.push("");

  if (knownError) {
    lines.push(`### ${knownError.title}`);
    lines.push("");
    lines.push(`**Category:** ${knownError.category} | **Difficulty:** ${knownError.difficulty}`);
    lines.push("");
    lines.push(`**Explanation:** ${knownError.explanation}`);
    lines.push("");
    lines.push("**Suggested Fixes:**");
    for (const fix of knownError.fixes) {
      lines.push(`- ${fix}`);
    }
    lines.push("");
    lines.push("**Example:**");
    lines.push("");
    lines.push("Bad:");
    lines.push("```csharp");
    lines.push(knownError.example.bad);
    lines.push("```");
    lines.push("");
    lines.push("Good:");
    lines.push("```csharp");
    lines.push(knownError.example.good);
    lines.push("```");
    lines.push("");
    lines.push(`**Docs:** ${knownError.docUrl}`);
  } else {
    lines.push(
      "*This error is not in the CSharpFix database. Check the official docs for guidance.*"
    );
  }

  return lines.join("\n");
}

export function formatErrorList(errors: CSharpError[]): string {
  if (errors.length === 0) {
    return "No errors found matching the criteria.";
  }

  const lines: string[] = [];
  lines.push("| Code | Title | Category | Difficulty |");
  lines.push("|------|-------|----------|------------|");

  for (const error of errors) {
    lines.push(
      `| ${error.code} | ${error.title} | ${error.category} | ${error.difficulty} |`
    );
  }

  return lines.join("\n");
}

export function formatMultipleResults(results: FixResult[]): string {
  if (results.length === 0) {
    return "No C# compiler errors detected in the output.";
  }

  const lines: string[] = [];
  lines.push(`# CSharpFix: ${results.length} error(s) found`);
  lines.push("");

  for (let i = 0; i < results.length; i++) {
    if (i > 0) {
      lines.push("---");
      lines.push("");
    }
    lines.push(formatFixResult(results[i]));
    lines.push("");
  }

  return lines.join("\n");
}
