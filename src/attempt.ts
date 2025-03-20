import { failure } from "./failure";
import type { Result } from "./result";
import { success } from "./success";

/**
 * Executes a function and wraps its result in a Result type.
 * If the function throws, the error is caught and wrapped in a Failure result.
 *
 * @template T The type of the success value
 * @template E The type of error, must extend Error
 * @param fn The function to execute
 * @returns A Result containing either the function's return value or any thrown error
 *
 * @example
 * ```typescript
 * const result = attempt(() => {
 *   if (Math.random() > 0.5) throw new Error("Bad luck!");
 *   return "Success!";
 * });
 *
 * if (result.success) {
 *   console.log(result.value); // "Success!"
 * } else {
 *   console.error(result.error); // Error: Bad luck!
 * }
 * ```
 */
export function attempt<T, E extends Error>(fn: () => T): Result<T, E> {
	try {
		return success(fn());
	} catch (error) {
		return failure<E>(error);
	}
}

/**
 * Executes an async function and wraps its result in a Result type.
 * If the promise rejects, the error is caught and wrapped in a Failure result.
 *
 * @template T The type of the success value
 * @template E The type of error, must extend Error
 * @param fn The async function to execute
 * @returns A Promise of a Result containing either the resolved value or any rejection error
 *
 * @example
 * ```typescript
 * const result = await attemptAsync(async () => {
 *   const response = await fetch("https://api.example.com/data");
 *   if (!response.ok) throw new Error("API error");
 *   return response.json();
 * });
 *
 * if (result.success) {
 *   console.log(result.value); // API data
 * } else {
 *   console.error(result.error); // Error: API error
 * }
 * ```
 */
export function attemptAsync<T, E extends Error>(
	fn: () => Promise<T>,
): Promise<Result<T, E>> {
	return fn()
		.then(success)
		.catch((error) => failure<E>(error));
}
