import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { LoginData, RegisterData } from "../../interfaces";

export type User = { email: string; name: string };

interface IStoreUser {
  isLoading: boolean;
  user: User | null;
  isAuthChecked: boolean;
  error: string;
}
const initialState: IStoreUser = {
  user: null,
  error: "",
  isAuthChecked: false,
  isLoading: false,
};

export const getUser = createAsyncThunk("user/checkAuth", async () => {
  return api.getUser();
});
export const login = createAsyncThunk("user/login", async (body: LoginData) => {
  return api.login(body);
});
export const register = createAsyncThunk("user/register", async (body: RegisterData) => {
  return api.register(body);
});
export const editUser = createAsyncThunk("user/editUser", async (body: Partial<RegisterData>) => {
  return api.editUser(body);
});
export const logout = createAsyncThunk("user/logout", async () => {
  return api.logout();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = "";
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message ?? "";
      })

      /* register */
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message ?? "";
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
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isLoading = false;
        // state.error = action.error.message ?? "";
      })

      /* editUser */
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.error.message ?? "";
      });
  },
});

export const { setAuthChecked, setUser, clearError } = userSlice.actions;
