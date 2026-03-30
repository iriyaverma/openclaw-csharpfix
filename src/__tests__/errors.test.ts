import { describe, it, expect } from "vitest";
import {
  ERROR_DATABASE,
  findByCode,
  findByPattern,
  findByCategory,
  listCategories,
} from "../errors.js";

describe("ERROR_DATABASE", () => {
  it("should contain at least 25 entries", () => {
    expect(ERROR_DATABASE.length).toBeGreaterThanOrEqual(25);
  });

  it("should have no duplicate error codes", () => {
    const codes = ERROR_DATABASE.map((e) => e.code);
    const unique = new Set(codes);
    expect(unique.size).toBe(codes.length);
  });

  it("should have valid code format for all entries", () => {
    for (const error of ERROR_DATABASE) {
      expect(error.code).toMatch(/^CS\d{4}$/);
    }
  });

  it("should have non-empty title for all entries", () => {
    for (const error of ERROR_DATABASE) {
      expect(error.title.length).toBeGreaterThan(0);
    }
  });

  it("should have valid category for all entries", () => {
    const validCategories = [
      "type", "null", "async", "linq", "syntax",
      "access", "generic", "cast", "namespace", "misc",
    ];
    for (const error of ERROR_DATABASE) {
      expect(validCategories).toContain(error.category);
    }
  });

  it("should have a RegExp pattern for all entries", () => {
    for (const error of ERROR_DATABASE) {
      expect(error.pattern).toBeInstanceOf(RegExp);
    }
  });

  it("should have non-empty explanation for all entries", () => {
    for (const error of ERROR_DATABASE) {
      expect(error.explanation.length).toBeGreaterThan(10);
    }
  });

  it("should have at least one fix for all entries", () => {
    for (const error of ERROR_DATABASE) {
      expect(error.fixes.length).toBeGreaterThan(0);
    }
  });

  it("should have example with bad and good code for all entries", () => {
    for (const error of ERROR_DATABASE) {
      expect(error.example.bad.length).toBeGreaterThan(0);
      expect(error.example.good.length).toBeGreaterThan(0);
    }
  });

  it("should have a docUrl for all entries", () => {
    for (const error of ERROR_DATABASE) {
      expect(error.docUrl).toMatch(/^https:\/\//);
    }
  });

  it("should have valid difficulty for all entries", () => {
    const validDifficulties = ["beginner", "intermediate", "advanced"];
    for (const error of ERROR_DATABASE) {
      expect(validDifficulties).toContain(error.difficulty);
    }
  });

  it("should include CS0029", () => {
    const found = ERROR_DATABASE.find((e) => e.code === "CS0029");
    expect(found).toBeDefined();
    expect(found!.category).toBe("type");
  });

  it("should include CS8602", () => {
    const found = ERROR_DATABASE.find((e) => e.code === "CS8602");
    expect(found).toBeDefined();
    expect(found!.category).toBe("null");
  });

  it("should include CS4033 in the async category", () => {
    const found = ERROR_DATABASE.find((e) => e.code === "CS4033");
    expect(found).toBeDefined();
    expect(found!.category).toBe("async");
  });
});

describe("findByCode", () => {
  it("should find an error by its full code", () => {
    const result = findByCode("CS0029");
    expect(result).toBeDefined();
    expect(result!.code).toBe("CS0029");
  });

  it("should find an error by numeric code without CS prefix", () => {
    const result = findByCode("0103");
    expect(result).toBeDefined();
    expect(result!.code).toBe("CS0103");
  });

  it("should be case-insensitive", () => {
    const result = findByCode("cs0246");
    expect(result).toBeDefined();
    expect(result!.code).toBe("CS0246");
  });

  it("should return undefined for unknown code", () => {
    const result = findByCode("CS9999");
    expect(result).toBeUndefined();
  });
});

describe("findByPattern", () => {
  it("should match CS0029 pattern", () => {
    const result = findByPattern(
      "CS0029 Cannot implicitly convert type 'string' to 'int'"
    );
    expect(result).toBeDefined();
    expect(result!.code).toBe("CS0029");
  });

  it("should match CS0103 pattern", () => {
    const result = findByPattern(
      "CS0103 The name 'foo' does not exist in the current context"
    );
    expect(result).toBeDefined();
    expect(result!.code).toBe("CS0103");
  });

  it("should return undefined for unmatched pattern", () => {
    const result = findByPattern("some random string that matches nothing");
    expect(result).toBeUndefined();
  });
});

describe("findByCategory", () => {
  it("should return errors for the null category", () => {
    const results = findByCategory("null");
    expect(results.length).toBeGreaterThan(0);
    for (const e of results) {
      expect(e.category).toBe("null");
    }
  });

  it("should return errors for the type category", () => {
    const results = findByCategory("type");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should return empty array for non-existent category", () => {
    const results = findByCategory("nonexistent");
    expect(results).toHaveLength(0);
  });
});

describe("listCategories", () => {
  it("should return a sorted list of unique categories", () => {
    const categories = listCategories();
    expect(categories.length).toBeGreaterThan(0);
    const sorted = [...categories].sort();
    expect(categories).toEqual(sorted);
  });

  it("should include known categories", () => {
    const categories = listCategories();
    expect(categories).toContain("type");
    expect(categories).toContain("null");
    expect(categories).toContain("async");
    expect(categories).toContain("syntax");
    expect(categories).toContain("namespace");
  });
});
