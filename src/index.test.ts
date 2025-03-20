import { describe, expect, it } from "vitest";
import {
	type Failure,
	type Result,
	type Success,
	attempt,
	attemptAsync,
	failure,
	success,
} from "./index";

describe("index exports", () => {
	it("should export all types", () => {
		// Verificação em tempo de compilação
		type AssertSuccess = Success<number>;
		type AssertFailure = Failure<Error>;
		type AssertResult = Result<number, Error>;

		// Verificação básica de estrutura
		const successType: Success<number> = { success: true, value: 42 };
		const failureType: Failure<Error> = { success: false, error: new Error() };
		const resultType: Result<number, Error> =
			Math.random() > 0.5 ? successType : failureType;

		expect(successType.success).toBe(true);
		expect(failureType.success).toBe(false);
		expect(typeof resultType.success).toBe("boolean");
	});

	it("should export all functions", () => {
		// Verificação em tempo de compilação
		type AssertSuccessFn = typeof success;
		type AssertFailureFn = typeof failure;
		type AssertAttemptFn = typeof attempt;
		type AssertAttemptAsyncFn = typeof attemptAsync;

		// Verificação básica de tipos das funções
		expect(typeof success).toBe("function");
		expect(typeof failure).toBe("function");
		expect(typeof attempt).toBe("function");
		expect(typeof attemptAsync).toBe("function");
	});
});
