import { ordersSocket, useGetOrdersQuery } from "../../services/orders/api";
import styles from "./profile.module.scss";
import OrderCard from "../../components/order/order-card";
import { useEffect } from "react";

export default function HistoryOrders() {
  const { data } = useGetOrdersQuery();
  useEffect(() => {
    return () => {
      ordersSocket && ordersSocket.readyState === ordersSocket.OPEN && ordersSocket.close();
    };
  }, []);
  return data?.loading ? (
    <img src="/loader.svg" alt="loading..." />
  ) : (
    <div className={styles.list + " custom-scroll"}>
      {data?.orders && data.orders.map((order) => <OrderCard key={order._id} order={order} />)}
    </div>
  );
}
