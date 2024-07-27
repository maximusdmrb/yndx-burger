import { EmailData, LoginData, RegisterData, ResetData } from "../interfaces";
import { query, queryWithToken, refreshToken } from "../utils/axios";

const GET_ING = "/ingredients";
const POST_ORDERS = "/orders";
const POST_REGISTER = "/auth/register";
const POST_LOGIN = "/auth/login";
const POST_LOGOUT = "/auth/logout";
const GET_USER = "/auth/user";
const POST_FOGOT = "/password-reset";
const POST_RESET = "/password-reset/reset";
const GET_ORDER = "/orders";

class Api {
  getIngredients = async () => query(GET_ING);
  getOrder = async (number: string) => query(GET_ORDER + `/${number}`);

  login = async (body: LoginData) => query(POST_LOGIN, "POST", body);
  register = async (body: RegisterData) => query(POST_REGISTER, "POST", body);
  logout = async () => query(POST_LOGOUT, "POST", { token: localStorage.getItem("refreshToken") });

  fogot = async (body: EmailData) => query(POST_FOGOT, "POST", body);
  reset = async (body: ResetData) => query(POST_RESET, "POST", body);

  /* Protected query */
  getUser = async () => queryWithToken(GET_USER);
  editUser = async (body: Partial<RegisterData>) => queryWithToken(GET_USER, "PATCH", body);
  order = async (ingredients: string[]) => queryWithToken(POST_ORDERS, "POST", { ingredients });

  socketConnect = (url: string, updateCachedData: (arg: any) => void, withToken = false) => {
    const token = localStorage.getItem("accessToken")?.split(" ")[1];
    let socket: WebSocket = new WebSocket(`${url}${withToken ? `?token=${token}` : ""}`);

    socket.onopen = () => {
      console.log("open", url);
    };
    socket.onclose = () => {
      console.log("close ", url);
    };
    socket.onmessage = async (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.message === "Invalid or missing token") {
          socket.close();
          await refreshToken();
          this.socketConnect(url, updateCachedData, withToken);
          return;
        }
        updateCachedData(() => {
          return {
            ...data,
            orders: withToken ? data.orders.reverse() : data.orders,
            loading: false,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    return socket;
  };
}
export default new Api();
