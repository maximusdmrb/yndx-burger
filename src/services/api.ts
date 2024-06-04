import axios from "axios";

const BASE_URL = "https://norma.nomoreparties.space/api";
const GET_ING = "/ingredients";
const POST_ORDER = "/orders";

class Api {
  async getIngredients() {
    try {
      const res = await axios(BASE_URL + GET_ING);
      if (res.data) return res.data.data;
      return Promise.reject(`Произошла ошибка запроса ${res.status}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async order(ingredients: string[]) {
    try {
      const res = await axios.post(BASE_URL + POST_ORDER, { ingredients });
      if (res.data) return res.data;
      return Promise.reject(`Произошла ошибка запроса ${res.status}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
export default new Api();
