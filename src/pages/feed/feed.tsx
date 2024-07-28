import Typography from "../../components/typography/typography";
import { useGetFeedQuery } from "../../services/feed/api";
import styles from "./feed.module.scss";
import cn from "../../utils/cn";
import OrderCard from "../../components/order/order-card";
import CenterLayout from "../../layout/center-layout";
export default function Feed() {
  const { data } = useGetFeedQuery();
  if (!data || data.loading)
    return (
      <CenterLayout>
        <img src="/loader.svg" alt="loading..." />
      </CenterLayout>
    );

  return (
    <div className={styles.grid + "  pb-10 "}>
      <div className={styles.col + " pt-10"}>
        <Typography variant="large" className="mb-10">
          Лента заказов
        </Typography>
        <div className={styles.list + " custom-scroll"}>
          {data?.orders && data.orders.map((order) => <OrderCard key={order._id} order={order} />)}
        </div>
      </div>
      <div className={cn(styles.col, styles.gap, "pl-4 pt-25")}>
        <div className={cn(styles.grid)}>
          <div>
            <Typography variant="medium">Готовы:</Typography>
            <ul>
              {data?.orders &&
                data.orders
                  .filter((order) => order.status === "done")
                  .slice(0, 10)
                  .map((order) => (
                    <li key={order._id}>
                      <Typography style={{ color: "#00CCCC" }} variant="digits">
                        {order.number}
                      </Typography>
                    </li>
                  ))}
            </ul>
          </div>
          <div>
            <Typography variant="medium">В работе:</Typography>
            <ul>
              {data?.orders &&
                data.orders
                  .filter((order) => order.status === "pending")
                  .slice(0, 10)
                  .map((order) => (
                    <li key={order._id}>
                      <Typography variant="digits">{order.number}</Typography>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
        <div>
          <Typography variant="medium">Выполнено за все время:</Typography>
          <Typography className="order-shadow" variant="digits_large">
            {data?.total}
          </Typography>
        </div>
        <div>
          <Typography variant="medium">Выполнено за сегодня:</Typography>
          <Typography className="order-shadow" variant="digits_large">
            {data?.totalToday}
          </Typography>
        </div>
        <div></div>
      </div>
    </div>
  );
}
