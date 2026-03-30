export type ErrorCategory =
  | "type"
  | "null"
  | "async"
  | "linq"
  | "syntax"
  | "access"
  | "generic"
  | "cast"
  | "namespace"
  | "misc";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface CSharpError {
  code: string;
  title: string;
  category: ErrorCategory;
  pattern: RegExp;
  explanation: string;
  fixes: string[];
  example: {
    bad: string;
    good: string;
  };
  docUrl: string;
  difficulty: Difficulty;
}

export interface ParsedError {
  file: string;
  line: number;
  column: number;
  code: string;
  message: string;
  severity: "error" | "warning";
}

export interface FixResult {
  parsed: ParsedError;
  knownError: CSharpError | undefined;
}
