import { CSharpError } from "./types.js";

export const ERROR_DATABASE: CSharpError[] = [
  {
    code: "CS0029",
    title: "Cannot implicitly convert type",
    category: "type",
    pattern: /CS0029.*cannot implicitly convert type/i,
    explanation:
      "The compiler cannot automatically convert one type to another. This typically happens when assigning a value of one type to a variable of an incompatible type without an explicit cast.",
    fixes: [
      "Add an explicit cast: (TargetType)value",
      "Use a conversion method like Convert.ToInt32(), .ToString(), etc.",
      "Change the variable type to match the assigned value",
      "Use the 'as' operator for reference types",
    ],
    example: {
      bad: 'int number = "hello";',
      good: 'int number = int.Parse("42");',
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0029",
    difficulty: "beginner",
  },
  {
    code: "CS0103",
    title: "The name does not exist in the current context",
    category: "namespace",
    pattern: /CS0103.*name '.*' does not exist/i,
    explanation:
      "The compiler cannot find the specified name (variable, method, type) in the current scope. The name may be misspelled, out of scope, or missing a using directive.",
    fixes: [
      "Check spelling of the identifier",
      "Add the appropriate using directive",
      "Ensure the variable is declared before use",
      "Check that the variable is in scope",
    ],
    example: {
      bad: "Console.WriteLine(mesage);",
      good: 'string message = "hi";\nConsole.WriteLine(message);',
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0103",
    difficulty: "beginner",
  },
  {
    code: "CS0117",
    title: "Type does not contain a definition",
    category: "access",
    pattern: /CS0117.*does not contain a definition for/i,
    explanation:
      "The specified type does not have a member (method, property, field) with the given name. This can happen when calling a method that doesn't exist on a type or accessing a non-existent property.",
    fixes: [
      "Check the member name for typos",
      "Verify you are using the correct type",
      "Check if the member exists in a different namespace or class",
      "Ensure the correct assembly is referenced",
    ],
    example: {
      bad: "int result = Math.Multiply(2, 3);",
      good: "double result = Math.Pow(2, 3);",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0117",
    difficulty: "beginner",
  },
  {
    code: "CS0120",
    title: "An object reference is required for the non-static member",
    category: "access",
    pattern: /CS0120.*object reference is required/i,
    explanation:
      "You are trying to access an instance member (field, property, method) without an object instance, typically from a static context like a static method.",
    fixes: [
      "Create an instance of the class and access the member through it",
      "Make the member static if it doesn't depend on instance state",
      "Pass an instance as a parameter to the static method",
    ],
    example: {
      bad: "class Foo { int x = 5; static void Bar() { Console.WriteLine(x); } }",
      good: "class Foo { int x = 5; static void Bar() { var f = new Foo(); Console.WriteLine(f.x); } }",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0120",
    difficulty: "beginner",
  },
  {
    code: "CS0161",
    title: "Not all code paths return a value",
    category: "syntax",
    pattern: /CS0161.*not all code paths return a value/i,
    explanation:
      "A method with a non-void return type has at least one code path that does not return a value. Every possible execution path must end with a return statement.",
    fixes: [
      "Add a return statement for every code path",
      "Add a default return at the end of the method",
      "Use switch expressions or ternary operators for concise returns",
      "Throw an exception for unreachable code paths",
    ],
    example: {
      bad: "int Get(bool b) { if (b) return 1; }",
      good: "int Get(bool b) { if (b) return 1; return 0; }",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0161",
    difficulty: "beginner",
  },
  {
    code: "CS0165",
    title: "Use of unassigned local variable",
    category: "type",
    pattern: /CS0165.*use of unassigned local variable/i,
    explanation:
      "A local variable is used before it has been assigned a value. C# requires definite assignment before a variable can be read.",
    fixes: [
      "Assign a default value when declaring the variable",
      "Ensure all code paths assign the variable before use",
      "Use nullable types and check for null",
    ],
    example: {
      bad: "int x;\nConsole.WriteLine(x);",
      good: "int x = 0;\nConsole.WriteLine(x);",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0165",
    difficulty: "beginner",
  },
  {
    code: "CS0234",
    title: "The type or namespace name does not exist in the namespace",
    category: "namespace",
    pattern: /CS0234.*type or namespace name '.*' does not exist in the namespace/i,
    explanation:
      "The specified type or namespace was not found within the given namespace. This usually means a missing NuGet package, assembly reference, or incorrect namespace.",
    fixes: [
      "Install the required NuGet package",
      "Add a project reference to the assembly containing the type",
      "Check spelling of the namespace or type name",
      "Verify the target framework supports the namespace",
    ],
    example: {
      bad: "using System.Text.Json.Extras;",
      good: "using System.Text.Json;",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0234",
    difficulty: "intermediate",
  },
  {
    code: "CS0246",
    title: "The type or namespace name could not be found",
    category: "namespace",
    pattern: /CS0246.*type or namespace name '.*' could not be found/i,
    explanation:
      "The compiler cannot resolve the specified type or namespace. This typically means a missing using directive, missing assembly reference, or missing NuGet package.",
    fixes: [
      "Add the correct using directive",
      "Install the required NuGet package (dotnet add package ...)",
      "Add a project or assembly reference",
      "Check for typos in the type name",
    ],
    example: {
      bad: "List<int> items = new List<int>();",
      good: "using System.Collections.Generic;\nList<int> items = new List<int>();",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0246",
    difficulty: "beginner",
  },
  {
    code: "CS0266",
    title: "Cannot implicitly convert type (explicit conversion exists)",
    category: "cast",
    pattern: /CS0266.*cannot implicitly convert type/i,
    explanation:
      "An implicit conversion doesn't exist between two types, but an explicit conversion does. You need to use a cast to indicate you understand the potential data loss.",
    fixes: [
      "Add an explicit cast: (TargetType)value",
      "Use Convert class methods",
      "Review whether the conversion is actually safe",
    ],
    example: {
      bad: "int x = 3.14;",
      good: "int x = (int)3.14;",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0266",
    difficulty: "beginner",
  },
  {
    code: "CS0411",
    title: "Type arguments cannot be inferred from usage",
    category: "generic",
    pattern: /CS0411.*type arguments.*cannot be inferred/i,
    explanation:
      "The compiler cannot determine the generic type arguments from the method call. You must specify them explicitly.",
    fixes: [
      "Specify generic type arguments explicitly: Method<Type>(args)",
      "Ensure the arguments provide enough type information",
      "Add intermediate variables with explicit types",
    ],
    example: {
      bad: "var result = Enumerable.Empty();",
      good: "var result = Enumerable.Empty<string>();",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0411",
    difficulty: "intermediate",
  },
  {
    code: "CS0428",
    title: "Cannot convert method group to non-delegate type",
    category: "type",
    pattern: /CS0428.*cannot convert method group/i,
    explanation:
      "You referenced a method name without calling it (missing parentheses). The compiler sees a 'method group' rather than a method invocation.",
    fixes: [
      "Add parentheses to invoke the method: Method()",
      "If assigning to a delegate, use the correct delegate type",
      "Use a lambda expression if a delegate is needed",
    ],
    example: {
      bad: "string s = obj.ToString;",
      good: "string s = obj.ToString();",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0428",
    difficulty: "beginner",
  },
  {
    code: "CS0501",
    title: "Member must declare a body because it is not marked abstract, extern, or partial",
    category: "syntax",
    pattern: /CS0501.*must declare a body/i,
    explanation:
      "A non-abstract, non-extern, non-partial method or property is missing its implementation body. Either provide a body or add the appropriate modifier.",
    fixes: [
      "Add a method body with { }",
      "Mark the method as abstract (and the class too)",
      "Use expression-bodied syntax: => expression;",
      "For auto-properties, use { get; set; }",
    ],
    example: {
      bad: "class Foo { public int GetValue(); }",
      good: "class Foo { public int GetValue() { return 42; } }",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0501",
    difficulty: "beginner",
  },
  {
    code: "CS0535",
    title: "Class does not implement interface member",
    category: "type",
    pattern: /CS0535.*does not implement interface member/i,
    explanation:
      "A class declares that it implements an interface but is missing one or more required member implementations.",
    fixes: [
      "Implement all interface members in the class",
      "Use your IDE's 'Implement Interface' quick action",
      "If intentional, make the class abstract",
      "Use explicit interface implementation for conflicting members",
    ],
    example: {
      bad: "interface IFoo { void Do(); }\nclass Foo : IFoo { }",
      good: "interface IFoo { void Do(); }\nclass Foo : IFoo { public void Do() { } }",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0535",
    difficulty: "intermediate",
  },
  {
    code: "CS0542",
    title: "Member names cannot be the same as their enclosing type",
    category: "syntax",
    pattern: /CS0542.*member names cannot be the same as their enclosing type/i,
    explanation:
      "A field, property, or method has the same name as the enclosing class. Only constructors can share the class name.",
    fixes: [
      "Rename the member to something different from the class name",
      "If it's meant to be a constructor, remove the return type",
    ],
    example: {
      bad: "class Foo { public int Foo { get; set; } }",
      good: "class Foo { public int Value { get; set; } }",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0542",
    difficulty: "beginner",
  },
  {
    code: "CS0619",
    title: "Member is obsolete",
    category: "misc",
    pattern: /CS0619.*is obsolete/i,
    explanation:
      "The member has been marked with the [Obsolete] attribute with error=true, meaning it can no longer be used. You must switch to the recommended replacement.",
    fixes: [
      "Use the replacement indicated in the obsolete message",
      "Check the documentation for the updated API",
      "If you own the code, update the [Obsolete] attribute",
    ],
    example: {
      bad: '[Obsolete("Use NewMethod", true)]\nvoid OldMethod() { }\nvoid Call() { OldMethod(); }',
      good: "void NewMethod() { }\nvoid Call() { NewMethod(); }",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0619",
    difficulty: "beginner",
  },
  {
    code: "CS1001",
    title: "Identifier expected",
    category: "syntax",
    pattern: /CS1001.*identifier expected/i,
    explanation:
      "The compiler expected an identifier (name) but found something else. This often indicates a syntax error such as a missing variable name, extra comma, or misplaced keyword.",
    fixes: [
      "Add the missing identifier (variable, method, or parameter name)",
      "Check for extra or misplaced commas and semicolons",
      "Ensure keywords are not used as identifiers without @-prefix",
    ],
    example: {
      bad: "int = 5;",
      good: "int x = 5;",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs1001",
    difficulty: "beginner",
  },
  {
    code: "CS1061",
    title: "Type does not contain a definition and no accessible extension method",
    category: "access",
    pattern: /CS1061.*does not contain a definition for '.*' and no accessible extension method/i,
    explanation:
      "The type does not have the specified member, and no extension method with that name was found. This is often a typo or a missing using directive for extension methods.",
    fixes: [
      "Check the member name for typos",
      "Add a using directive for the namespace containing the extension method",
      "Verify you are calling the member on the correct type",
      "Install the NuGet package that provides the extension method",
    ],
    example: {
      bad: '"hello".Reverse();',
      good: "using System.Linq;\n\"hello\".ToCharArray().Reverse();",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs1061",
    difficulty: "intermediate",
  },
  {
    code: "CS1501",
    title: "No overload for method takes the specified number of arguments",
    category: "type",
    pattern: /CS1501.*no overload for method '.*' takes \d+ arguments/i,
    explanation:
      "The method was called with the wrong number of arguments. No overload exists that accepts the argument count you provided.",
    fixes: [
      "Check the method signature for the correct number of parameters",
      "Remove extra arguments or add missing ones",
      "Check if optional parameters are available",
      "Use named arguments for clarity",
    ],
    example: {
      bad: 'Console.WriteLine("a", "b", "c", "d", "e");',
      good: 'Console.WriteLine("{0} {1}", "a", "b");',
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs1501",
    difficulty: "beginner",
  },
  {
    code: "CS1503",
    title: "Cannot convert argument type",
    category: "type",
    pattern: /CS1503.*cannot convert from '.*' to '.*'/i,
    explanation:
      "An argument passed to a method has the wrong type and cannot be implicitly converted to the expected parameter type.",
    fixes: [
      "Cast or convert the argument to the expected type",
      "Use a different overload that accepts your argument type",
      "Parse or transform the value before passing it",
    ],
    example: {
      bad: 'int.Parse(42);',
      good: 'int.Parse("42");',
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs1503",
    difficulty: "beginner",
  },
  {
    code: "CS1929",
    title: "Type does not contain a definition for the extension method",
    category: "access",
    pattern: /CS1929.*does not contain a definition for '.*'/i,
    explanation:
      "An extension method was called on a type that it doesn't apply to. The 'this' parameter type of the extension method does not match the type you're calling it on.",
    fixes: [
      "Check that the extension method applies to this type",
      "Convert the object to the correct type first",
      "Add the correct using directive for the extension method's namespace",
      "Verify the extension method signature",
    ],
    example: {
      bad: "int x = 5;\nx.Select(i => i);",
      good: "using System.Linq;\nint[] arr = { 5 };\narr.Select(i => i);",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs1929",
    difficulty: "intermediate",
  },
  {
    code: "CS4033",
    title: "The 'await' operator can only be used within an async method",
    category: "async",
    pattern: /CS4033.*'await'.*can only be used.*async/i,
    explanation:
      "You used the await keyword in a method that is not marked as async. The await operator requires the containing method to have the async modifier.",
    fixes: [
      "Add the async modifier to the method signature",
      "Change the return type to Task or Task<T>",
      "Use .Result or .GetAwaiter().GetResult() synchronously (not recommended)",
      "Restructure to use async all the way up the call chain",
    ],
    example: {
      bad: "void Load() { var data = await FetchAsync(); }",
      good: "async Task Load() { var data = await FetchAsync(); }",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs4033",
    difficulty: "intermediate",
  },
  {
    code: "CS7036",
    title: "There is no argument given that corresponds to the required formal parameter",
    category: "type",
    pattern: /CS7036.*no argument given that corresponds to the required.*parameter/i,
    explanation:
      "A method or constructor was called without providing all required parameters. Optional parameters can be omitted, but required ones cannot.",
    fixes: [
      "Provide all required arguments in the method call",
      "Check the method signature for required parameters",
      "Add default values to parameters to make them optional",
      "Use named arguments for clarity",
    ],
    example: {
      bad: "void Greet(string name) { }\nGreet();",
      good: 'void Greet(string name) { }\nGreet("Alice");',
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs7036",
    difficulty: "beginner",
  },
  {
    code: "CS8600",
    title: "Converting null literal or possible null value to non-nullable type",
    category: "null",
    pattern: /CS8600.*null literal.*to non-nullable/i,
    explanation:
      "With nullable reference types enabled, you are assigning null or a possibly-null value to a variable declared as non-nullable.",
    fixes: [
      "Declare the variable as nullable: string? instead of string",
      "Add a null check before assignment",
      "Use the null-coalescing operator: value ?? defaultValue",
      "Use the null-forgiving operator (!) if you are certain it's not null",
    ],
    example: {
      bad: "string s = null;",
      good: "string? s = null;",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings",
    difficulty: "intermediate",
  },
  {
    code: "CS8602",
    title: "Dereference of a possibly null reference",
    category: "null",
    pattern: /CS8602.*dereference of a possibly null reference/i,
    explanation:
      "You are accessing a member on a variable that the compiler has determined could be null, which would cause a NullReferenceException at runtime.",
    fixes: [
      "Add a null check before accessing the member",
      "Use the null-conditional operator: obj?.Member",
      "Use the null-forgiving operator (!) if you're certain it's not null",
      "Use pattern matching: if (obj is not null) { ... }",
    ],
    example: {
      bad: "string? s = GetValue();\nint len = s.Length;",
      good: "string? s = GetValue();\nint len = s?.Length ?? 0;",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings",
    difficulty: "intermediate",
  },
  {
    code: "CS8604",
    title: "Possible null reference argument for parameter",
    category: "null",
    pattern: /CS8604.*null reference argument/i,
    explanation:
      "You are passing a possibly-null value as an argument to a parameter that does not accept null.",
    fixes: [
      "Add a null check before passing the argument",
      "Use the null-coalescing operator to provide a default value",
      "Change the parameter to accept nullable types",
      "Use the null-forgiving operator (!) if certain the value is not null",
    ],
    example: {
      bad: "void Process(string s) { }\nstring? val = GetVal();\nProcess(val);",
      good: "void Process(string s) { }\nstring? val = GetVal();\nif (val is not null) Process(val);",
    },
    docUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings",
    difficulty: "intermediate",
  },
];

export function findByCode(code: string): CSharpError | undefined {
  const normalized = code.toUpperCase().startsWith("CS")
    ? code.toUpperCase()
    : `CS${code}`;
  return ERROR_DATABASE.find((e) => e.code === normalized);
}

export function findByPattern(message: string): CSharpError | undefined {
  return ERROR_DATABASE.find((e) => e.pattern.test(message));
}

export function findByCategory(category: string): CSharpError[] {
  return ERROR_DATABASE.filter((e) => e.category === category);
}

export function listCategories(): string[] {
  return [...new Set(ERROR_DATABASE.map((e) => e.category))].sort();
}
