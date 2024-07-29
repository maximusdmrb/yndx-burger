import Typography from "../typography/typography";
import { useSelector } from "../../services/store";

export default function OrderDetails() {
  const { loading, error, order } = useSelector((store) => store.order);
  return loading ? (
    <>
      <img src="/loader.svg" alt="loading..." />
      <Typography variant="medium" className="mt-15">
        Оформляем заказ
      </Typography>
    </>
  ) : (
    <>
      <Typography className={"order-shadow" + " mb-8 mt-8"} variant="digits_large">
        {error ? "Упс..." : order?.number}
      </Typography>
      <Typography variant="medium" className="mb-15">
        {error ? "Произошла ошибка, попробуйте снова" : "идентификатор заказа"}
      </Typography>
      {!error && (
        <>
          <img className="mb-15" src="/done.svg" alt="Заказ оформлен" />
          <Typography className="mb-2">Ваш заказ начали готовить</Typography>
          <Typography className="text-secondary mb-15">
            Дождитесь готовности на орбитальной станции
          </Typography>
        </>
      )}
    </>
  );
}
