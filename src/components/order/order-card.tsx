import styles from "./order.module.scss";
import { getFormatOrderDate } from "../../utils/date";
import Typography from "../typography/typography";
import cn from "../../utils/cn";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Order } from "../../types";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../services/store";

const breakNum = 6;

export enum Color {
  done = "#00CCCC",
  pending = "#FFFFFF",
  created = "red",
}
export enum RenderStatus {
  done = "Выполнен",
  pending = "Готовится",
  created = "Создан",
}

export default function OrderCard({ order }: { order: Order }) {
  const location = useLocation();

  const { ingredients: allIngredients } = useSelector((state) => state.ings);
  const ingredients =
    order.ingredients.length !== 1 &&
    order.ingredients[0] === order.ingredients[order.ingredients.length - 1]
      ? order.ingredients.slice(0, -1)
      : order.ingredients;

  const isLotsIngs = ingredients.length > breakNum;

  if (ingredients.some((ing) => !allIngredients.map((i) => i._id).includes(ing))) return null;

  return (
    <Link
      to={`${location.pathname}/${order.number}`}
      state={{ background: location, title: order.number }}>
      <div className={styles.card}>
        <div className={styles.head}>
          <span>
            <Typography variant="digits">#{order.number}</Typography>
          </span>
          <span>
            <Typography color="secondary">{getFormatOrderDate(order.createdAt)}</Typography>
          </span>
        </div>
        <div>
          <Typography variant="medium">{order.name}</Typography>
          {location.pathname.includes("/profile/orders") && (
            <Typography
              style={{ color: Color[order.status as keyof typeof Color] }}
              className="mt-2"
              variant="small">
              {RenderStatus[order.status as keyof typeof Color]}
            </Typography>
          )}
        </div>
        <div className={cn(styles.footer)}>
          <div className={cn(styles.ings)}>
            {ingredients.slice(0, breakNum).map((ing, i, arr) => (
              <div
                key={ing + i}
                className={cn(styles.ing, { [styles.more]: i === arr.length - 1 && isLotsIngs })}
                style={{ zIndex: arr.length - i, translate: i ? -20 * i + "px" : "" }}>
                <img src={`/ings/${ing}.png`} />
                {i === arr.length - 1 && isLotsIngs && (
                  <div className={cn(styles.after)}>+{ingredients.length - arr.length}</div>
                )}
              </div>
            ))}
          </div>
          <div>
            <Typography variant="digits">
              {ingredients.reduce(
                (acc, curr) => (acc += allIngredients.find((ing) => ing._id === curr)?.price || 0),
                allIngredients.find((ing) => ing._id === ingredients[0])?.price || 0,
              )}
              <CurrencyIcon type="primary" />
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
