import styles from "./modal.module.scss";
import Typography from "../typography/typography";

export default function OrderDetails() {
  return (
    <>
      <Typography className={styles.order + " mb-8 mt-8"} variants="digits_large">
        0411231
      </Typography>
      <Typography variants="medium" className="mb-15">
        идентификатор заказа
      </Typography>
      <img className="mb-15" src="/done.svg" alt="Заказ оформлен" />
      <Typography className="mb-2">Ваш заказ начали готовить</Typography>
      <Typography className="text-secondary mb-15">Дождитесь готовности на орбитальной станции</Typography>
    </>
  );
}
