import { ParsedError, FixResult } from "./types.js";
import { findByCode, findByPattern } from "./errors.js";

const MSBUILD_PATTERN =
  /^(.+?)\((\d+),(\d+)\):\s*(error|warning)\s+(CS\d{4}):\s*(.+)$/;

const DOTNET_PATTERN =
  /^(.+?)\((\d+),(\d+)\):\s*(error|warning)\s+(CS\d{4}):\s*(.+)\s*\[.*\]$/;

const SIMPLE_PATTERN = /^(error|warning)\s+(CS\d{4}):\s*(.+)$/;

export function extractErrorCode(line: string): string | undefined {
  const match = line.match(/CS\d{4}/);
  return match ? match[0] : undefined;
}

export function parseLine(line: string): ParsedError | undefined {
  const trimmed = line.trim();
  if (!trimmed) return undefined;

  let match = trimmed.match(DOTNET_PATTERN);
  if (match) {
    return {
      file: match[1],
      line: parseInt(match[2], 10),
      column: parseInt(match[3], 10),
      severity: match[4] as "error" | "warning",
      code: match[5],
      message: match[6].trim(),
    };
  }

  match = trimmed.match(MSBUILD_PATTERN);
  if (match) {
    return {
      file: match[1],
      line: parseInt(match[2], 10),
      column: parseInt(match[3], 10),
      severity: match[4] as "error" | "warning",
      code: match[5],
      message: match[6].trim(),
    };
  }

  match = trimmed.match(SIMPLE_PATTERN);
  if (match) {
    return {
      file: "<unknown>",
      line: 0,
      column: 0,
      severity: match[1] as "error" | "warning",
      code: match[2],
      message: match[3].trim(),
    };
  }

  return undefined;
}

export function parseCompilerOutput(output: string): FixResult[] {
  const lines = output.split("\n");
  const results: FixResult[] = [];

  for (const line of lines) {
    const parsed = parseLine(line);
    if (!parsed) continue;

    const knownError =
      findByCode(parsed.code) ??
      findByPattern(`${parsed.code} ${parsed.message}`);

    results.push({ parsed, knownError });
  }

  return results;
}

export function lookupError(codeOrMessage: string): FixResult | undefined {
  const codeMatch = codeOrMessage.match(/CS\d{4}/);
  if (codeMatch) {
    const code = codeMatch[0];
    const knownError = findByCode(code);
    if (knownError) {
      return {
        parsed: {
          file: "<lookup>",
          line: 0,
          column: 0,
          severity: "error",
          code,
          message: knownError.title,
        },
        knownError,
      };
    }
  }

  const knownError = findByPattern(codeOrMessage);
  if (knownError) {
    return {
      parsed: {
        file: "<lookup>",
        line: 0,
        column: 0,
        severity: "error",
        code: knownError.code,
        message: codeOrMessage,
      },
      knownError,
    };
  }

  return undefined;
}
