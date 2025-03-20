import { ensureError } from "./ensureError";

/**
 * Represents a failed operation result containing an error.
 * @template E The type of error, must extend Error
 */
export type Failure<E extends Error> = {
	success: false;
	error: E;
};

/**
 * Creates a Failure result containing the provided error.
 * If the error is not an Error instance, it will be converted to one.
 *
 * @template E The type of error, must extend Error
 * @param error The error value to wrap in a Failure result
 * @returns A Failure result containing the error
 *
 * @example
 * ```typescript
 * const result = failure(new Error("Something went wrong"));
 * // result: { success: false, error: Error("Something went wrong") }
 *
 * const result2 = failure("Something went wrong");
 * // result2: { success: false, error: Error("Something went wrong") }
 * ```
 */
export const failure = <E extends Error>(error: unknown): Failure<E> => ({
	success: false,
	error: ensureError(error) as E,
});
