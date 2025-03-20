import { describe, expect, it } from "vitest";
import { type Failure, failure } from "./failure";

describe("Failure Type", () => {
	it("should have correct type structure", () => {
		const result: Failure<Error> = {
			success: false,
			error: new Error("test error"),
		};

		expect(result.success).toBe(false);
		expect(result.error).toBeInstanceOf(Error);
		expect(result.error.message).toBe("test error");
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

		const result: Failure<CustomError> = {
			success: false,
			error: new CustomError("custom error", 400),
		};

		expect(result.success).toBe(false);
		expect(result.error).toBeInstanceOf(CustomError);
		expect(result.error.message).toBe("custom error");
		expect(result.error.code).toBe(400);
	});
});

describe("failure constructor", () => {
	it("should create a Failure object with Error instance", () => {
		const error = new Error("test error");
		const result = failure(error);
		expect(result.success).toBe(false);
		expect(result.error).toBe(error);
	});

	it("should create a Failure object from string", () => {
		const result = failure("error message");
		expect(result.success).toBe(false);
		expect(result.error).toBeInstanceOf(Error);
		expect(result.error.message).toBe("error message");
	});

	it("should create a Failure object from undefined", () => {
		const result = failure(undefined);
		expect(result.success).toBe(false);
		expect(result.error).toBeInstanceOf(Error);
		expect(result.error.message).toBe("An unknown error occurred");
	});

	it("should create a Failure object from null", () => {
		const result = failure(null);
		expect(result.success).toBe(false);
		expect(result.error).toBeInstanceOf(Error);
		expect(result.error.message).toBe("An unknown error occurred");
	});

	it("should create a Failure object from object", () => {
		const result = failure({ custom: "error" });
		expect(result.success).toBe(false);
		expect(result.error).toBeInstanceOf(Error);
		expect(result.error.message).toBe("An unknown error occurred");
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
		const result = failure<CustomError>(error);
		expect(result.success).toBe(false);
		expect(result.error).toBe(error);
		expect(result.error.code).toBe(400);
	});
});
