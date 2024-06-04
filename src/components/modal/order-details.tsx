import styles from "./modal.module.scss";
import Typography from "../typography/typography";
import { useTypedSelector } from "../../hooks/use-typed-selector";

export default function OrderDetails() {
  const { error, order } = useTypedSelector((store) => store.order);
  return (
    <>
      <Typography className={styles.order + " mb-8 mt-8"} variants="digits_large">
        {error ? "Упс..." : order?.number}
      </Typography>
      <Typography variants="medium" className="mb-15">
        {error ? "Произошла ошибка, попробуйте снова" : "идентификатор заказа"}
      </Typography>
      {!error && (
        <>
          <img className="mb-15" src="/done.svg" alt="Заказ оформлен" />
          <Typography className="mb-2">Ваш заказ начали готовить</Typography>
          <Typography className="text-secondary mb-15">Дождитесь готовности на орбитальной станции</Typography>
        </>
      )}
    </>
  );
}
