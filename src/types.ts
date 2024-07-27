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

export type FeedRepsonse = {
  orders: Order[];
  loading: boolean;
  success: boolean;
  total: number;
  totalToday: number;
};
