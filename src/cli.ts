import { ERROR_DATABASE, findByCode, findByCategory, listCategories } from "./errors.js";
import { parseCompilerOutput, lookupError } from "./parser.js";
import { formatFixResult, formatErrorList, formatMultipleResults } from "./formatter.js";

export interface CliContext {
  args: string[];
  stdin?: string;
  log: (message: string) => void;
}

export function runCli(ctx: CliContext): void {
  const [subcommand, ...rest] = ctx.args;

  switch (subcommand) {
    case "errors":
      handleErrors(ctx, rest);
      break;
    case "lookup":
      handleLookup(ctx, rest);
      break;
    case "categories":
      handleCategories(ctx);
      break;
    default:
      ctx.log("CSharpFix - C# Compiler Error Helper");
      ctx.log("");
      ctx.log("Usage: csharpfix <subcommand> [options]");
      ctx.log("");
      ctx.log("Subcommands:");
      ctx.log("  errors [category]   List known errors, optionally by category");
      ctx.log("  lookup <code>       Look up a specific error code (e.g. CS0029)");
      ctx.log("  categories          List all error categories");
      break;
  }
}

function handleErrors(ctx: CliContext, args: string[]): void {
  const category = args[0];
  const errors = category ? findByCategory(category) : ERROR_DATABASE;
  ctx.log(formatErrorList(errors));
}

function handleLookup(ctx: CliContext, args: string[]): void {
  const query = args.join(" ");
  if (!query) {
    ctx.log("Usage: csharpfix lookup <error-code>");
    ctx.log("Example: csharpfix lookup CS0029");
    return;
  }

  const result = lookupError(query);
  if (result) {
    ctx.log(formatFixResult(result));
  } else {
    ctx.log(`No information found for: ${query}`);
  }
}

function handleCategories(ctx: CliContext): void {
  const categories = listCategories();
  ctx.log("Available categories:");
  ctx.log("");
  for (const cat of categories) {
    const count = findByCategory(cat).length;
    ctx.log(`  ${cat} (${count} errors)`);
  }
}
