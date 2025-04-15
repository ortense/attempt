import type { Result } from "./result";

/**
 * Represents a match object containing success and failure functions.
 * @template T The type of the success value
 * @template E The type of error, must extend Error
 */
export type Match<T, E extends Error> = {
	success: (value: T) => void;
	failure: (error: E) => void;
};

/**
 * Matches a Result value and calls the appropriate function based on whether it is a success or failure.
 *
 * @template T The type of the success value
 * @template E The type of error, must extend Error
 *
 * @param result The Result value to match
 * @param match The match object containing success and failure functions
 *
 * @example
 * ```typescript
 * const result = attempt(() => parseInt("123"));
 * match(result, {
 *   success: (value) => console.log(value),
 *   failure: (error) => console.error(error),
 * });
 */
export function match<T, E extends Error>(
	result: Result<T, E>,
	match: Match<T, E>,
) {
	if (result.success) {
		match.success(result.value);
		return;
	}

	match.failure(result.error);
}
