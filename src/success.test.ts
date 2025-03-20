import { describe, expect, it } from "vitest";
import { type Success, success } from "./success";

describe("Success Type", () => {
	it("should have correct type structure", () => {
		const result: Success<number> = {
			success: true,
			value: 42,
		};

		expect(result.success).toBe(true);
		expect(result.value).toBe(42);
	});

	it("should work with different value types", () => {
		const numberResult: Success<number> = { success: true, value: 42 };
		const stringResult: Success<string> = { success: true, value: "test" };
		const objectResult: Success<{ id: number }> = {
			success: true,
			value: { id: 1 },
		};

		expect(numberResult.value).toBe(42);
		expect(stringResult.value).toBe("test");
		expect(objectResult.value.id).toBe(1);
	});
});

describe("success constructor", () => {
	it("should create a Success object with number value", () => {
		const result = success(42);
		expect(result.success).toBe(true);
		expect(result.value).toBe(42);
	});

	it("should create a Success object with string value", () => {
		const result = success("test");
		expect(result.success).toBe(true);
		expect(result.value).toBe("test");
	});

	it("should create a Success object with object value", () => {
		const value = { id: 1, name: "test" };
		const result = success(value);
		expect(result.success).toBe(true);
		expect(result.value).toBe(value);
	});

	it("should create a Success object with undefined value", () => {
		const result = success(undefined);
		expect(result.success).toBe(true);
		expect(result.value).toBeUndefined();
	});

	it("should create a Success object with null value", () => {
		const result = success(null);
		expect(result.success).toBe(true);
		expect(result.value).toBeNull();
	});
});
