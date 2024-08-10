import { switchTab, tabSlice } from "./tab-slice";

describe("tab reducer", () => {
  it("correct init", () => {
    const state = tabSlice.reducer(undefined, { type: "" });
    expect(state).toEqual("bun");
  });

  it("correct tab switching", () => {
    const state = tabSlice.reducer("bun", { type: switchTab.type, payload: "main" });
    expect(state).toEqual("main");
  });
});
