import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import Typography from "../typography/typography";
import { useCallback, useEffect, useMemo } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details";
import Burger from "./burger";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { store } from "../../services/store";
import { closeOrder, orderQuery } from "../../services/slices/order-slice";
import { clearBurger } from "../../services/slices/constructor-slice";
import { useLocation, useNavigate } from "react-router-dom";

export default function BurgerConstructor() {
  const { user } = useTypedSelector((store) => store.user);
  const { bun, selectedIngredients } = useTypedSelector((store) => store.burger);
  const { error, loading, order } = useTypedSelector((store) => store.order);

  const location = useLocation();
  const navigate = useNavigate();

  const bunPrice = bun ? bun.price * 2 : 0;
  const totalPrice = useMemo(() => selectedIngredients.reduce((acc, cur) => acc + cur.price, bunPrice), [bunPrice, selectedIngredients]);

  const handleOrder = useCallback(() => {
    if (!user) {
      localStorage.setItem("order", "true");
      return navigate("/login", { state: location.state });
    }
    bun && store.dispatch(orderQuery([bun?._id, ...selectedIngredients.map((ing) => ing._id), bun?._id]));
    localStorage.removeItem("order");
  }, [bun, selectedIngredients]);

  const handleCloseModal = useCallback(() => {
    store.dispatch(closeOrder());
    !error && store.dispatch(clearBurger());
  }, [loading]);
  useEffect(() => {
    localStorage.getItem("order") && handleOrder();
  }, []);
  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(selectedIngredients));
    localStorage.setItem("bun", JSON.stringify(bun));
  }, [bun, selectedIngredients]);

  return (
    <>
      <Burger />
      <div className={styles.total + " mt-10 mr-6"} style={{ opacity: totalPrice ? 1 : 0.5 }}>
        <Typography variants="digits_medium">
          {totalPrice}
          <CurrencyIcon type="primary" />
        </Typography>
        <Button disabled={loading || !bun || !selectedIngredients.length} onClick={handleOrder} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {(loading || order.number) && (
        <Modal onClose={loading ? () => {} : handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
