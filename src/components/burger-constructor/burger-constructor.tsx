import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import Typography from "../typography/typography";
import { useCallback, useMemo } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details";
import Burger from "./burger";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { store } from "../../services/store";
import { closeOrder, orderQuery } from "../../services/slices/order-slice";
import { clearBurger } from "../../services/slices/constructor-slice";

export default function BurgerConstructor() {
  const order = useTypedSelector((store) => store.order);

  const { bun, selectedIngredients } = useTypedSelector((store) => store.burger);
  const { error, loading, show } = useTypedSelector((store) => store.order);
  const bunPrice = bun ? bun.price * 2 : 0;
  const totalPrice = useMemo(() => bunPrice + selectedIngredients.reduce((acc, cur) => acc + cur.price, 0), [bunPrice, selectedIngredients]);

  const handleOrder = useCallback(() => {
    bun && store.dispatch(orderQuery([bun?._id, ...selectedIngredients.map((ing) => ing._id), bun?._id]));
  }, [bun, selectedIngredients]);

  const handleCloseModal = () => {
    store.dispatch(closeOrder());
    !error && store.dispatch(clearBurger());
  };

  return (
    <>
      <Burger />
      <div className={styles.total + " mt-10 mr-6"} style={{ opacity: totalPrice ? 1 : 0.5 }}>
        <Typography variants="digits_medium">
          {totalPrice}
          <CurrencyIcon type="primary" />
        </Typography>
        <Button disabled={loading || show || !bun || !selectedIngredients.length} onClick={handleOrder} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {order.show && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
