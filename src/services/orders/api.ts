import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FeedRepsonse } from "../../types";
import api from "../api";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getOrders: builder.query<FeedRepsonse, void>({
      queryFn: () => ({
        data: { orders: [], loading: true, success: false, total: 0, totalToday: 0 },
      }),

      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;

        const onmessage = (data: FeedRepsonse) =>
          updateCachedData(() => ({
            ...data,
            orders: data.orders.reverse(),
            loading: false,
          }));

        const ordersSocket = api.socketConnect(
          "wss://norma.nomoreparties.space/orders",
          onmessage,
          true,
        );

        await cacheEntryRemoved;
        ordersSocket.close();
      },
    }),
  }),
});
export const { useGetOrdersQuery } = ordersApi;
