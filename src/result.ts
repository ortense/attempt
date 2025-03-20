import type { Failure } from "./failure";
import type { Success } from "./success";

/**
 * Represents the result of an operation that may succeed or fail.
 * Uses discriminated union type for type-safe handling of both cases.
 *
 * @template T The type of the success value
 * @template E The type of error, must extend Error
 *
 * @example
 * ```typescript
 * const result: Result<number, Error> = attempt(() => parseInt("123"));
 *
 * if (result.success) {
 *   // TypeScript knows result.value is number
 *   console.log(result.value);
 * } else {
 *   // TypeScript knows result.error is Error
 *   console.error(result.error);
 * }
 * ```
 */
export type Result<T, E extends Error> = Success<T> | Failure<E>;
