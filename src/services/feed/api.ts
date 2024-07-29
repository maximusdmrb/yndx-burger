import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FeedRepsonse } from "../../types";
import api from "../api";

export const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({
    getFeed: build.query<FeedRepsonse, void>({
      queryFn: () => ({
        data: { orders: [], loading: true, success: false, total: 0, totalToday: 0 },
      }),
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;

        const onmessage = (data: FeedRepsonse) =>
          updateCachedData(() => ({
            ...data,
            orders: data.orders,
            loading: false,
          }));

        const feedSocket = api.socketConnect(
          "wss://norma.nomoreparties.space/orders/all",
          onmessage,
        );

        await cacheEntryRemoved;
        feedSocket.close();
      },
    }),
  }),
});
export const { useGetFeedQuery } = feedApi;
