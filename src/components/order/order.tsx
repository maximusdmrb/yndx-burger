import styles from "./order.module.scss";
import { getFormatOrderDate } from "../../utils/date";
import Typography from "../typography/typography";
import cn from "../../utils/cn";
import { useSelector } from "../../hooks/use-typed-selector";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Order } from "../../services/feed/api";

export default function OrderComponent({ order }: { order: Order }) {
  const { ingredients: allIngredients } = useSelector((state) => state.ings);
  const breakNum = 6;
  const ingredients = order.ingredients.slice(0, -1);
  const isLotsIngs = ingredients.length > breakNum;
  return (
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
      </div>
      <div className={cn(styles.footer)}>
        <div className={cn(styles.ings)}>
          {ingredients.slice(0, breakNum).map((ing, i, arr) => (
            <div key={ing + i} className={cn(styles.ing, { [styles.more]: i === arr.length - 1 && isLotsIngs })} style={{ zIndex: arr.length - i, translate: i ? -20 * i + "px" : "" }}>
              <img src={`/ings/${ing}.png`} />
              {i === arr.length - 1 && isLotsIngs && <div className={cn(styles.after)}>+{ingredients.length - arr.length}</div>}
            </div>
          ))}
        </div>
        <div>
          <Typography variant="digits">
            {ingredients.reduce((acc, curr) => (acc += allIngredients.find((ing) => ing._id === curr)?.price || 0), allIngredients.find((ing) => ing._id === ingredients[0])?.price || 0)}
            <CurrencyIcon type="primary" />
          </Typography>
        </div>
      </div>
    </div>
  );
}
