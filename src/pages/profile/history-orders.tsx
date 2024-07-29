import { useGetOrdersQuery } from "../../services/orders/api";
import styles from "./profile.module.scss";
import OrderCard from "../../components/order/order-card";

export default function HistoryOrders() {
  const { data } = useGetOrdersQuery();
  if (!data || data.loading) {
    return <img src="/loader.svg" alt="loading..." />;
  }

  return (
    <div className={styles.list + " custom-scroll"}>
      {data?.orders && data.orders.map((order) => <OrderCard key={order._id} order={order} />)}
    </div>
  );
}
