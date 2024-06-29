import styles from "./order.module.scss";
import { getFormatOrderDate } from "../../utils/date";
import Typography from "../typography/typography";

type Order = {
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

export default function OrderComponent({ order }: { order: Order }) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span>
          <Typography variant="digits">#{order.number}</Typography>
        </span>
        <span>
          <Typography variant="default">{getFormatOrderDate(order.createdAt)}</Typography>
        </span>
      </div>
      <div>{order.name}</div>
    </div>
  );
}
