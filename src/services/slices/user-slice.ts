import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { editUser, getUser, login, logout, register } from "../actions";

export type User = { email: string; name: string };

interface IStoreUser {
  isLoading: boolean;
  user: User | null;
  isAuthChecked: boolean;
  error: string;
}
export const initialState: IStoreUser = {
  user: null,
  error: "",
  isAuthChecked: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /* login */
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = "";
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action: { error: SerializedError }) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error?.message ?? "Неизвестная ошибка";
      })

      /* register */
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(register.rejected, (state, action: { error: SerializedError }) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error?.message ?? "Неизвестная ошибка";
      })

      /* logout */
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = "";
      })

      /* getUser */
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action: { error: SerializedError }) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error?.message ?? "Неизвестная ошибка";
      })

      /* editUser */
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(editUser.rejected, (state, action: { error: SerializedError }) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.error?.message ?? "Неизвестная ошибка";
      });
  },
});

export const { setAuthChecked, clearError } = userSlice.actions;
