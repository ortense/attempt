import { describe, expect, it } from "vitest";
import { failure } from "./failure";
import type { Result } from "./result";
import { success } from "./success";

describe("Result Type", () => {
	it("should work with success case", () => {
		const result: Result<number, Error> = success(42);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.value).toBe(42);
		}
	});

	it("should work with failure case", () => {
		const error = new Error("test error");
		const result: Result<number, Error> = failure(error);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe(error);
		}
	});

	it("should work with custom value types", () => {
		interface User {
			id: number;
			name: string;
		}
		const user: User = { id: 1, name: "John" };
		const result: Result<User, Error> = success(user);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.value).toBe(user);
			expect(result.value.id).toBe(1);
			expect(result.value.name).toBe("John");
		}
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
		const error = new CustomError("custom error", 400);
		const result: Result<number, CustomError> = failure(error);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe(error);
			expect(result.error.code).toBe(400);
		}
	});

	it("should allow type narrowing based on success property", () => {
		const successResult: Result<number, Error> = success(42);
		const failureResult: Result<number, Error> = failure(new Error("test"));

		// Type narrowing for success case
		if (successResult.success) {
			const value: number = successResult.value;
			expect(value).toBe(42);
		} else {
			// TypeScript should prevent accessing .value here
			// @ts-expect-error value should not be accessible in failure case
			successResult.value;
		}

		// Type narrowing for failure case
		if (!failureResult.success) {
			const error: Error = failureResult.error;
			expect(error).toBeInstanceOf(Error);
		} else {
			// TypeScript should prevent accessing .error here
			// @ts-expect-error error should not be accessible in success case
			failureResult.error;
		}
	});
});
