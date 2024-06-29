import Order from "../../components/order/order";
import Typography from "../../components/typography/typography";
import styles from "./feed.module.scss";
export default function Feed() {
  const mockOrder = {
    _id: "65d320e897ede0001d05cd57",
    ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093d"],
    owner: "6580932787899c001b824179",
    status: "done",
    name: "Флюоресцентный люминесцентный бургер",
    createdAt: "2024-02-19T09:35:36.239Z",
    updatedAt: "2024-02-19T09:35:36.815Z",
    number: 34535,
    __v: 0,
  };

  return (
    <div className={styles.grid + " pb-10 "}>
      <div className={styles.col + " pt-10"}>
        <Typography variant="large">Лента заказов</Typography>
        <Order order={mockOrder} />
      </div>
      <div className={styles.col + " pl-4 pt-25"}>Готовы и в работе</div>
    </div>
  );
}
