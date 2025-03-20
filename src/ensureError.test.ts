import { describe, expect, it } from "vitest";
import { ensureError } from "./ensureError";

describe("ensureError", () => {
	it("should return the same error if input is Error instance", () => {
		const originalError = new Error("test error");
		const result = ensureError(originalError);
		expect(result).toBe(originalError);
	});

	it("should create Error from string", () => {
		const result = ensureError("error message");
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe("error message");
	});

	it("should create Error with default message for undefined", () => {
		const result = ensureError(undefined);
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe("An unknown error occurred");
	});

	it("should create Error with default message for null", () => {
		const result = ensureError(null);
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe("An unknown error occurred");
	});

	it("should create Error with default message for objects", () => {
		const result = ensureError({ custom: "error" });
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toBe("An unknown error occurred");
	});

	it("should work with custom error types", () => {
		class CustomError extends Error {
			constructor(
				message: string,
				public code: number,
			) {
				super(message);
				this.name = "CustomError";
			}
		}

		const originalError = new CustomError("custom error", 400);
		const result = ensureError<CustomError>(originalError);
		expect(result).toBe(originalError);
		expect(result.code).toBe(400);
	});

	it("should preserve error stack trace", () => {
		const originalError = new Error("test error");
		const result = ensureError(originalError);
		expect(result.stack).toBe(originalError.stack);
	});
});
