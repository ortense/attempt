import { describe, expect, it, vi } from "vitest";
import { failure } from "./failure";
import { match } from "./match";
import { success } from "./success";

describe("match", () => {
	it("should call success function when result is successful", () => {
		const result = success(42);
		const matchSpy = { success: vi.fn(), failure: vi.fn() };

		match(result, matchSpy);

		expect(matchSpy.success).toHaveBeenCalledWith(42);
		expect(matchSpy.failure).not.toHaveBeenCalled();
	});

	it("should call failure function when result is an error", () => {
		const error = new Error("Something went wrong");
		const result = failure(error);
		const matchSpy = { success: vi.fn(), failure: vi.fn() };

		match(result, matchSpy);

		expect(matchSpy.success).not.toHaveBeenCalled();
		expect(matchSpy.failure).toHaveBeenCalledWith(error);
	});
});
