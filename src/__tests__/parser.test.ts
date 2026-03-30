import { describe, it, expect } from "vitest";
import {
  parseCompilerOutput,
  lookupError,
  extractErrorCode,
  parseLine,
} from "../parser.js";

describe("extractErrorCode", () => {
  it("should extract CS code from a line", () => {
    expect(
      extractErrorCode("Program.cs(10,5): error CS0029: Cannot implicitly convert")
    ).toBe("CS0029");
  });

  it("should extract CS code from a simple error line", () => {
    expect(extractErrorCode("error CS0103: The name 'x' does not exist")).toBe(
      "CS0103"
    );
  });

  it("should return undefined for lines without CS codes", () => {
    expect(extractErrorCode("Build succeeded.")).toBeUndefined();
  });
});

describe("parseLine", () => {
  it("should parse MSBuild-style error line", () => {
    const result = parseLine(
      "Program.cs(10,5): error CS0029: Cannot implicitly convert type"
    );
    expect(result).toBeDefined();
    expect(result!.file).toBe("Program.cs");
    expect(result!.line).toBe(10);
    expect(result!.column).toBe(5);
    expect(result!.code).toBe("CS0029");
    expect(result!.severity).toBe("error");
  });

  it("should parse dotnet build output with project path", () => {
    const result = parseLine(
      "Helpers/Utils.cs(42,12): warning CS8602: Dereference of a possibly null reference. [/app/MyProject.csproj]"
    );
    expect(result).toBeDefined();
    expect(result!.file).toBe("Helpers/Utils.cs");
    expect(result!.line).toBe(42);
    expect(result!.column).toBe(12);
    expect(result!.severity).toBe("warning");
    expect(result!.code).toBe("CS8602");
  });

  it("should parse simple error format", () => {
    const result = parseLine(
      "error CS0246: The type or namespace name 'Foo' could not be found"
    );
    expect(result).toBeDefined();
    expect(result!.file).toBe("<unknown>");
    expect(result!.code).toBe("CS0246");
  });

  it("should return undefined for non-error lines", () => {
    expect(parseLine("Build succeeded.")).toBeUndefined();
    expect(parseLine("")).toBeUndefined();
    expect(parseLine("  Restoring packages...")).toBeUndefined();
  });
});

describe("parseCompilerOutput", () => {
  it("should parse multi-line MSBuild output", () => {
    const output = [
      "Microsoft (R) Build Engine version 17.0.0",
      "Build started 1/1/2025 12:00:00 PM.",
      "Program.cs(10,5): error CS0029: Cannot implicitly convert type 'string' to 'int'",
      "Program.cs(20,8): error CS0103: The name 'x' does not exist in the current context",
      "    1 Warning(s)",
      "    2 Error(s)",
      "",
      "Build FAILED.",
    ].join("\n");

    const results = parseCompilerOutput(output);
    expect(results).toHaveLength(2);
    expect(results[0].parsed.code).toBe("CS0029");
    expect(results[1].parsed.code).toBe("CS0103");
  });

  it("should match known errors from the database", () => {
    const output =
      "Program.cs(5,1): error CS0029: Cannot implicitly convert type 'string' to 'int'";
    const results = parseCompilerOutput(output);
    expect(results).toHaveLength(1);
    expect(results[0].knownError).toBeDefined();
    expect(results[0].knownError!.code).toBe("CS0029");
  });

  it("should handle output with no errors", () => {
    const output = "Build succeeded.\n\n    0 Warning(s)\n    0 Error(s)";
    const results = parseCompilerOutput(output);
    expect(results).toHaveLength(0);
  });

  it("should handle warnings", () => {
    const output =
      "File.cs(3,10): warning CS8602: Dereference of a possibly null reference.";
    const results = parseCompilerOutput(output);
    expect(results).toHaveLength(1);
    expect(results[0].parsed.severity).toBe("warning");
  });

  it("should handle dotnet build output with project reference", () => {
    const output =
      "Models/User.cs(15,20): error CS0246: The type or namespace name 'JsonProperty' could not be found [/app/src/Api.csproj]";
    const results = parseCompilerOutput(output);
    expect(results).toHaveLength(1);
    expect(results[0].parsed.file).toBe("Models/User.cs");
    expect(results[0].parsed.code).toBe("CS0246");
  });

  it("should parse multiple different errors in one output", () => {
    const output = [
      "A.cs(1,1): error CS0246: The type or namespace name 'Foo' could not be found",
      "B.cs(2,3): error CS8600: Converting null literal or possible null value to non-nullable type.",
      "C.cs(5,10): error CS4033: The 'await' operator can only be used within an async method",
    ].join("\n");

    const results = parseCompilerOutput(output);
    expect(results).toHaveLength(3);
    expect(results[0].parsed.code).toBe("CS0246");
    expect(results[1].parsed.code).toBe("CS8600");
    expect(results[2].parsed.code).toBe("CS4033");
  });
});

describe("lookupError", () => {
  it("should look up a known error code", () => {
    const result = lookupError("CS0029");
    expect(result).toBeDefined();
    expect(result!.knownError).toBeDefined();
    expect(result!.knownError!.code).toBe("CS0029");
  });

  it("should return undefined for unknown error code", () => {
    const result = lookupError("CS9999");
    expect(result).toBeUndefined();
  });

  it("should look up by message pattern", () => {
    const result = lookupError(
      "CS0103 The name 'myVar' does not exist in the current context"
    );
    expect(result).toBeDefined();
    expect(result!.knownError!.code).toBe("CS0103");
  });
});
