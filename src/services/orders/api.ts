import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FeedRepsonse } from "../../types";
import api from "../api";

export let ordersSocket: WebSocket;

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  refetchOnMountOrArgChange: true,

  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getOrders: builder.query<FeedRepsonse, void>({
      queryFn: () => ({
        data: { orders: [], loading: true, success: false, total: 0, totalToday: 0 },
      }),

      async onQueryStarted(_, { updateCachedData }) {
        ordersSocket = api.socketConnect(
          "wss://norma.nomoreparties.space/orders",
          updateCachedData,
          true,
        );
      },
    }),
  }),
});
export const { useGetOrdersQuery } = ordersApi;
