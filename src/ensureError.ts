/**
 * Ensures that any error value is converted to an Error instance.
 * If the error is already an Error instance, it is returned as is.
 * Otherwise, creates a new Error with the string representation or default message.
 *
 * @template E The expected error type, must extend Error
 * @param error The error value to ensure
 * @returns An Error instance
 * @internal
 */
export function ensureError<E extends Error>(error: unknown): E {
	if (error instanceof Error) {
		return error as E;
	}

	return new Error(
		typeof error === "string" ? error : "An unknown error occurred",
	) as E;
}
