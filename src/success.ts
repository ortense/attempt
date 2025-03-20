/**
 * Represents a successful operation result containing a value.
 * @template T The type of the success value
 */
export type Success<T> = {
	success: true;
	value: T;
};

/**
 * Creates a Success result containing the provided value.
 *
 * @template T The type of the success value
 * @param value The value to wrap in a Success result
 * @returns A Success result containing the value
 *
 * @example
 * ```typescript
 * const result = success(42);
 * // result: { success: true, value: 42 }
 * ```
 */
export const success = <T>(value: T): Success<T> => ({
	success: true,
	value,
});
