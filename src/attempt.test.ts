import { describe, expect, it } from "vitest";
import { attempt, attemptAsync } from "./attempt";
import type { Failure } from "./failure";
import { type Success, success } from "./success";

describe("attempt", () => {
	it("should return success when function does not throw", () => {
		const fn = () => 42;
		const result = attempt(fn);

		expect(result).toEqual(success(42));
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.value).toBe(42);
		}
	});

	it("should return failure when function throws Error", () => {
		const errorMessage = "Test error";
		const fn = () => {
			throw new Error(errorMessage);
		};

		const result = attempt(fn);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBeInstanceOf(Error);
			expect(result.error.message).toBe(errorMessage);
		}
	});

	it("should convert non-Error throw into Error instance", () => {
		const fn = () => {
			throw "string error";
		};

		const result = attempt(fn);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBeInstanceOf(Error);
			expect(result.error.message).toBe("string error");
		}
	});

	it("should handle async functions in synchronous context", () => {
		const fn = () => Promise.resolve(42);
		const result = attempt(fn);

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.value).toBeInstanceOf(Promise);
		}
	});
});

describe("attemptAsync", () => {
	it("should return success when Promise resolves", async () => {
		const result = await attemptAsync(Promise.resolve(42));

		expect(result.success).toBe(true);
		expect((result as Success<number>).value).toBe(42);
	});

	it("should return failure when Promise rejects with Error", async () => {
		const errorMessage = "Test async error";

		const result = await attemptAsync(Promise.reject(new Error(errorMessage)));
		const failure = result as Failure<Error>;

		expect(result.success).toBe(false);
		expect(failure.error).toBeInstanceOf(Error);
		expect(failure.error.message).toBe(errorMessage);
	});

	it("should convert non-Error rejection into Error instance", async () => {
		const failure = (await attemptAsync(
			Promise.reject("string async error"),
		)) as Failure<Error>;

		expect(failure.error).toBeInstanceOf(Error);
		expect(failure.error.message).toBe("string async error");
	});

	it("should handle nested promises", async () => {
		const result = await attemptAsync(Promise.resolve(Promise.resolve(42)));

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.value).toBe(42);
		}
	});
});
