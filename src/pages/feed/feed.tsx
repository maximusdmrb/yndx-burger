import { useEffect } from "react";
import Order from "../../components/order/order";
import Typography from "../../components/typography/typography";
import { socket, useGetFeedQuery } from "../../services/feed/api";
import styles from "./feed.module.scss";
export default function Feed() {
  const { data } = useGetFeedQuery(null, {});
  useEffect(() => {
    return () => {
      socket && socket.close();
    };
  }, []);
  return (
    <div className={styles.grid + "  pb-10 "}>
      <div className={styles.col + " pt-10"}>
        <Typography variant="large" className="mb-10">
          Лента заказов
        </Typography>
        <div className={styles.list + " custom-scroll"}>{data && data.map((order) => <Order key={order._id} order={order} />)}</div>
      </div>
      <div className={styles.col + " pl-4 pt-25"}>Готовы и в работе</div>
    </div>
  );
}
