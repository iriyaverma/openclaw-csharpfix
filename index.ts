import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { Type } from "@sinclair/typebox";
import { ERROR_DATABASE, findByCode, findByCategory, listCategories } from "./src/errors.js";
import { parseCompilerOutput, lookupError } from "./src/parser.js";
import { formatFixResult, formatErrorList, formatMultipleResults } from "./src/formatter.js";
import { runCli } from "./src/cli.js";

const CS_ERROR_PATTERN = /error CS\d{4}/;

export default definePluginEntry({
  id: "csharpfix",
  name: "CSharpFix",
  version: "1.0.0",

  init(api) {
    api.registerCli({
      commands: ["csharpfix"],
      handler(ctx) {
        runCli({
          args: ctx.args,
          stdin: ctx.stdin,
          log: ctx.log,
        });
      },
    });

    if (api.registrationMode === "cli-metadata") return;

    api.registerTool({
      name: "csharp_fix",
      description:
        "Paste C# compiler output to diagnose errors and get fix suggestions",
      parameters: Type.Object({
        output: Type.String({
          description: "Raw compiler output from dotnet build, csc, or MSBuild",
        }),
      }),
      async execute({ output }) {
        const results = parseCompilerOutput(output);
        return formatMultipleResults(results);
      },
    });

    api.registerTool({
      name: "csharp_explain",
      description:
        "Look up a specific C# error code (e.g. CS0029) and get a detailed explanation with fixes",
      parameters: Type.Object({
        code: Type.String({
          description: "C# error code like CS0029 or just 0029",
        }),
      }),
      async execute({ code }) {
        const result = lookupError(code);
        if (!result) return `No information found for error: ${code}`;
        return formatFixResult(result);
      },
    });

    api.registerTool({
      name: "csharp_errors",
      description:
        "List known C# compiler errors, optionally filtered by category",
      parameters: Type.Object({
        category: Type.Optional(
          Type.String({
            description:
              "Filter by category: type, null, async, linq, syntax, access, generic, cast, namespace, misc",
          })
        ),
      }),
      async execute({ category }) {
        const errors = category ? findByCategory(category) : ERROR_DATABASE;
        return formatErrorList(errors);
      },
    });

    api.registerHook("after_tool_call", async (context) => {
      const output =
        typeof context.result === "string" ? context.result : "";
      if (CS_ERROR_PATTERN.test(output)) {
        const results = parseCompilerOutput(output);
        if (results.length > 0) {
          return {
            appendToResult: `\n\n---\n**CSharpFix** detected ${results.length} C# error(s):\n\n${formatMultipleResults(results)}`,
          };
        }
      }
      return undefined;
    });
  },
});
