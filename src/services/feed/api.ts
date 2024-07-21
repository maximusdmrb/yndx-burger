import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "wss://norma.nomoreparties.space/orders/all";

export type Order = {
  _id: string;
  ingredients: string[];
  owner: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  __v: number;
};
type Feed = Order[];

export let socket: WebSocket | undefined;

export const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getFeed: builder.query<Feed, null>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        console.log(true);

        try {
          await cacheDataLoaded;
          socket = new WebSocket("wss://norma.nomoreparties.space/orders/all");

          socket.onopen = (msg) => {
            console.log("open");
          };
          socket.onclose = () => {
            console.log("close");
          };

          socket.onmessage = (msg) => {
            try {
              const feed = JSON.parse(msg.data).orders;
              updateCachedData(() => {
                return feed;
              });
              console.log("update");
            } catch {}
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const { useGetFeedQuery } = feedApi;
