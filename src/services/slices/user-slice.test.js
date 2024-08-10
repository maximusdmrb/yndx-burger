import { editUser, getUser, login, logout, register } from "../actions";
import { userSlice, initialState, setAuthChecked, clearError } from "./user-slice";

const mockUser = { email: "test@jest.ru", name: "Petre" };

describe("user reducer", () => {
  it("correct init", () => {
    const state = userSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("setAuthChecked", () => {
    const action = { type: setAuthChecked.type, payload: true };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it("clearError", () => {
    const state = userSlice.reducer(initialState, { type: clearError.type });
    expect(state).toEqual({ ...initialState, error: "" });
  });

  it("login.pending", () => {
    const state = userSlice.reducer(initialState, { type: login.pending.type });
    expect(state).toEqual({ ...initialState, isLoading: true, error: "" });
  });

  it("login.fulfilled", () => {
    const action = { type: login.fulfilled.type, payload: { user: mockUser } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, user: mockUser, isLoading: false, error: "", isAuthChecked: true });
  });

  it("login.rejected", () => {
    const action = { type: login.rejected.type, error: { message: "403" } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isAuthChecked: true, error: "403" });
  });

  it("login.rejected unknown error", () => {
    const action = { type: login.rejected.type, error: null };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isAuthChecked: true, error: "Неизвестная ошибка" });
  });

  it("register.pending", () => {
    const state = userSlice.reducer(initialState, { type: register.pending.type });
    expect(state).toEqual({ ...initialState, isLoading: true, error: "" });
  });

  it("register.fulfilled", () => {
    const action = { type: register.fulfilled.type, payload: { user: mockUser } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false, user: mockUser, isAuthChecked: true, error: "" });
  });

  it("register.rejected", () => {
    const action = { type: register.rejected.type, error: { message: "500" } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, user: null, isLoading: false, isAuthChecked: true, error: "500" });
  });

  it("register.rejected unknown error", () => {
    const action = { type: register.rejected.type, error: undefined };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      isLoading: false,
      isAuthChecked: true,
      error: "Неизвестная ошибка",
    });
  });

  it("logout.pending", () => {
    const state = userSlice.reducer(initialState, { type: logout.pending.type });
    expect(state).toEqual({ ...initialState, isLoading: true, error: "" });
  });

  it("logout.fulfilled", () => {
    const state = userSlice.reducer(initialState, { type: logout.fulfilled.type });
    expect(state).toEqual({ ...initialState, isLoading: false, user: null, error: "" });
  });

  it("getUser.pending", () => {
    const state = userSlice.reducer(initialState, { type: getUser.pending.type });
    expect(state).toEqual({ ...initialState, isLoading: true, error: "" });
  });

  it("getUser.fulfilled", () => {
    const action = { type: getUser.fulfilled.type, payload: { user: mockUser } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false, user: mockUser, error: "", isAuthChecked: true });
  });

  it("getUser.rejected", () => {
    const action = { type: getUser.rejected.type, error: { message: "403" } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, user: null, isLoading: false, isAuthChecked: true, error: "403" });
  });

  it("register.rejected unknown error", () => {
    const action = { type: getUser.rejected.type, error: undefined };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      isLoading: false,
      isAuthChecked: true,
      error: "Неизвестная ошибка",
    });
  });

  it("editUser.pending", () => {
    const state = userSlice.reducer(initialState, { type: editUser.pending.type });
    expect(state).toEqual({ ...initialState, isLoading: true, error: "" });
  });

  it("editUser.fulfilled", () => {
    const action = { type: editUser.fulfilled.type, payload: { user: mockUser } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false, user: mockUser, error: "" });
  });

  it("getUser.rejected", () => {
    const action = { type: editUser.rejected.type, error: { message: "403" } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, user: null, isLoading: false, error: "403" });
  });

  it("register.rejected unknown error", () => {
    const action = { type: editUser.rejected.type, error: undefined };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      isLoading: false,
      error: "Неизвестная ошибка",
    });
  });
});
