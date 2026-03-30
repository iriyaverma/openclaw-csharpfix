import { describe, it, expect } from "vitest";
import {
  formatFixResult,
  formatErrorList,
  formatMultipleResults,
} from "../formatter.js";
import { FixResult, CSharpError } from "../types.js";

const MOCK_ERROR: CSharpError = {
  code: "CS0029",
  title: "Cannot implicitly convert type",
  category: "type",
  pattern: /CS0029/,
  explanation: "The compiler cannot automatically convert one type to another.",
  fixes: ["Add an explicit cast", "Use a conversion method"],
  example: {
    bad: 'int x = "hello";',
    good: 'int x = int.Parse("42");',
  },
  docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0029",
  difficulty: "beginner",
};

const MOCK_RESULT_WITH_KNOWN: FixResult = {
  parsed: {
    file: "Program.cs",
    line: 10,
    column: 5,
    severity: "error",
    code: "CS0029",
    message: "Cannot implicitly convert type 'string' to 'int'",
  },
  knownError: MOCK_ERROR,
};

const MOCK_RESULT_UNKNOWN: FixResult = {
  parsed: {
    file: "Foo.cs",
    line: 3,
    column: 1,
    severity: "error",
    code: "CS9999",
    message: "Some unknown error",
  },
  knownError: undefined,
};

describe("formatFixResult", () => {
  it("should include the error code and severity", () => {
    const output = formatFixResult(MOCK_RESULT_WITH_KNOWN);
    expect(output).toContain("ERROR CS0029");
  });

  it("should include file location for file-based errors", () => {
    const output = formatFixResult(MOCK_RESULT_WITH_KNOWN);
    expect(output).toContain("Program.cs");
    expect(output).toContain("line 10");
  });

  it("should include explanation and fixes for known errors", () => {
    const output = formatFixResult(MOCK_RESULT_WITH_KNOWN);
    expect(output).toContain("Explanation:");
    expect(output).toContain("Suggested Fixes:");
    expect(output).toContain("Add an explicit cast");
  });

  it("should include example code for known errors", () => {
    const output = formatFixResult(MOCK_RESULT_WITH_KNOWN);
    expect(output).toContain("Bad:");
    expect(output).toContain("Good:");
    expect(output).toContain("```csharp");
  });

  it("should include doc URL for known errors", () => {
    const output = formatFixResult(MOCK_RESULT_WITH_KNOWN);
    expect(output).toContain("https://learn.microsoft.com");
  });

  it("should show fallback message for unknown errors", () => {
    const output = formatFixResult(MOCK_RESULT_UNKNOWN);
    expect(output).toContain("not in the CSharpFix database");
  });
});

describe("formatErrorList", () => {
  it("should format a table of errors", () => {
    const output = formatErrorList([MOCK_ERROR]);
    expect(output).toContain("CS0029");
    expect(output).toContain("Cannot implicitly convert type");
    expect(output).toContain("type");
    expect(output).toContain("beginner");
  });

  it("should return a message for empty lists", () => {
    const output = formatErrorList([]);
    expect(output).toContain("No errors found");
  });

  it("should include markdown table headers", () => {
    const output = formatErrorList([MOCK_ERROR]);
    expect(output).toContain("| Code |");
    expect(output).toContain("|------|");
  });
});

describe("formatMultipleResults", () => {
  it("should show error count in heading", () => {
    const output = formatMultipleResults([MOCK_RESULT_WITH_KNOWN]);
    expect(output).toContain("1 error(s) found");
  });

  it("should show all results", () => {
    const output = formatMultipleResults([
      MOCK_RESULT_WITH_KNOWN,
      MOCK_RESULT_UNKNOWN,
    ]);
    expect(output).toContain("2 error(s) found");
    expect(output).toContain("CS0029");
    expect(output).toContain("CS9999");
  });

  it("should return a message when no results", () => {
    const output = formatMultipleResults([]);
    expect(output).toContain("No C# compiler errors detected");
  });

  it("should include separator between multiple results", () => {
    const output = formatMultipleResults([
      MOCK_RESULT_WITH_KNOWN,
      MOCK_RESULT_UNKNOWN,
    ]);
    expect(output).toContain("---");
  });
});
