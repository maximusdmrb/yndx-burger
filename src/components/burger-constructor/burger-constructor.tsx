import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../pages/constructror/constructor";
import styles from "./burger-constructor.module.scss";
import Typography from "../typography/typography";
import { useMemo, useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details";

export default function BurgerConstructor({ selectedIngredients }: { selectedIngredients: Ingredient[] }) {
  /* Order Modal */
  const [order, setOrder] = useState(false);

  const bun = selectedIngredients.find((ing) => ing.type === "bun");
  const bunProps = bun && {
    isLocked: true,
    text: bun.name,
    price: bun.price,
    thumbnail: bun.image_mobile,
  };
  const totalPrice = useMemo(() => selectedIngredients.reduce((acc, cur) => acc + cur.price, 0), [selectedIngredients]);

  return (
    <>
      <div className={styles.higher}>
        {bunProps && <ConstructorElement type="top" {...bunProps} />}
        <div className={`${styles.list} ${styles.scroll} custom-scroll`}>
          {selectedIngredients
            .filter((ing) => ing.type !== "bun")
            .map((ing) => (
              <ConstructorElement key={ing._id} text={ing.name} price={ing.price} thumbnail={ing.image_mobile} />
            ))}
        </div>
        {bunProps && <ConstructorElement type="bottom" {...bunProps} />}
      </div>
      <div className={styles.total + " mt-10"}>
        <Typography variants="digits_medium">
          {totalPrice} <CurrencyIcon type="primary" />
        </Typography>
        <Button onClick={() => setOrder(true)} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {order && (
        <Modal onClose={() => setOrder(false)}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
