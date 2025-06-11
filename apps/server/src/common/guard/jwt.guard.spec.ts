import { JwtAuthguardGuard } from "./jwt.guard";

describe("JwtAuthguardGuard", () => {
  it("should be defined", () => {
    expect(new JwtAuthguardGuard()).toBeDefined();
  });
});
