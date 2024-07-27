import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FeedRepsonse } from "../../types";
import api from "../api";

export let feedSocket: WebSocket;

export const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: fetchBaseQuery(),
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getFeed: build.query<FeedRepsonse, void>({
      queryFn: () => ({
        data: { orders: [], loading: true, success: false, total: 0, totalToday: 0 },
      }),
      async onQueryStarted(_, { updateCachedData }) {
        console.log("onCacheEntryradd");

        feedSocket = api.socketConnect(
          "wss://norma.nomoreparties.space/orders/all",
          updateCachedData,
        );
      },
    }),
  }),
});
export const { useGetFeedQuery } = feedApi;
