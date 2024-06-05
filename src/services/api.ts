import { EmailData, LoginData, RegisterData, ResetData } from "../interfaces";
import { query, queryWithToken } from "../utils/axios";

const GET_ING = "/ingredients";
const POST_ORDERS = "/orders";
const POST_REGISTER = "/auth/register";
const POST_LOGIN = "/auth/login";
const POST_LOGOUT = "/auth/logout";
const GET_USER = "/auth/user";
const POST_FOGOT = "/password-reset";
const POST_RESET = "/password-reset/reset";

class Api {
  getIngredients = async () => query(GET_ING);

  login = async (body: LoginData) => query(POST_LOGIN, "POST", body);
  register = async (body: RegisterData) => query(POST_REGISTER, "POST", body);
  logout = async () => query(POST_LOGOUT, "POST", { token: localStorage.getItem("refreshToken") });

  fogot = async (body: EmailData) => query(POST_FOGOT, "POST", body);
  reset = async (body: ResetData) => query(POST_RESET, "POST", body);

  /* Protected query */
  getUser = async () => queryWithToken(GET_USER);
  editUser = async (body: Partial<RegisterData>) => queryWithToken(GET_USER, "PATCH", body);
  order = async (ingredients: string[]) => queryWithToken(POST_ORDERS, "POST", { ingredients });
}
export default new Api();
