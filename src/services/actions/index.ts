import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { LoginData, RegisterData } from "../../interfaces";

export const ingredientsQuery = createAsyncThunk("ings/getIngs", async () => api.getIngredients());

export const orderQuery = createAsyncThunk("order/orderQuery", async (ingredients: string[]) => api.order(ingredients));

export const getOrderQuery = createAsyncThunk("order/getOrderQuery", async (number: string) => api.getOrder(number));

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
