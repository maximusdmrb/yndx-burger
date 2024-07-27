import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FeedRepsonse, Order } from "../../types";
import Typography from "../../components/typography/typography";
import styles from "./feed.module.scss";
import { useDispatch, useSelector } from "../../services/store";
import cn from "../../utils/cn";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getFormatOrderDate } from "../../utils/date";
import { Color, RenderStatus } from "../../components/order/order-card";
import { getOrderQuery } from "../../services/slices/order-slice";

export default function OrderPage() {
  const location = useLocation();
  const { number } = useParams();
  const dispatch = useDispatch();
  if (!number) return;

  const order = useSelector((state) => {
    let data = state.feedApi.queries["getFeed(undefined)"]?.data as FeedRepsonse;
    let order;
    if (data && data.orders) {
      order = data.orders.find((ord: Order) => ord.number == +number);
      if (order) return order;
    }
    data = state.ordersApi.queries["getOrders(undefined)"]?.data as FeedRepsonse;
    if (data && data.orders) {
      order = data.orders.find((ord: Order) => ord.number == +number);
      console.log(order);
      if (order) return order;
    }
    return state.order.selectedOrder;
  });
  useEffect(() => {
    if (!order) dispatch(getOrderQuery(number));
  }, []);

  const { ingredients } = useSelector((state) => state.ings);

  if (!order) return <img src="/loader.svg" alt="loading..." />;

  let bun = 1;
  if (
    order?.ingredients
      .map((id) => ingredients.find((ing) => ing._id === id))
      .filter((ing) => ing?.type === "bun").length === 1
  )
    bun = 2;

  return (
    <div className={styles.modal}>
      {!location.state?.title && (
        <Typography variant="digits" style={{ textAlign: "center" }}>
          #{order.number}
        </Typography>
      )}
      <div>
        <Typography variant="medium">{order.name}</Typography>
        <Typography
          style={{ color: Color[order.status as keyof typeof Color] }}
          className="mt-2"
          variant="small">
          {RenderStatus[order.status as keyof typeof Color]}
        </Typography>
      </div>
      <div>
        <Typography variant="medium">Состав:</Typography>
        <ul className={cn("custom-scroll")}>
          {[...new Set(order.ingredients)].map((ing) => {
            const el = ingredients.find((i) => i._id === ing);
            let count = order.ingredients.filter((i) => i === ing).length;
            if (el?.type === "bun" && count === 1) count = 2;
            return (
              <li className={cn(styles.li)} key={ing}>
                <img src={`/ings/${ing}.png`} />
                <div className={styles.between}>
                  <div>
                    <Typography>{el?.name} </Typography>
                  </div>
                  <div>
                    <Typography variant="digits">
                      {count} x {el?.price}
                      <CurrencyIcon type="primary" />
                    </Typography>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={cn(styles.between)}>
        <Typography color="secondary">{getFormatOrderDate(order.createdAt)}</Typography>
        <Typography variant="digits">
          {order.ingredients.reduce(
            (acc, curr) =>
              (acc +=
                ingredients.find((i) => i._id === curr)!.price *
                  (ingredients.find((i) => i._id === curr)!.type === "bun" ? bun : 1) || 0),
            0,
          )}
          <CurrencyIcon type="primary" />
        </Typography>
      </div>
    </div>
  );
}
