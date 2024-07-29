import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "../../utils/cn";
import styles from "./profile.module.scss";
import { FocusEvent, FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { editUser } from "../../services/slices/user-slice";
import useForm from "../../hooks/use-form";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);
  if (!user) return;
  const { values, onChange, setValues } = useForm({ ...user, password: "*******" });

  const [disabledName, setDisabledName] = useState(true);
  const refName = useRef<HTMLInputElement>(null);

  const [isChanged, changedFileds] = useMemo(() => {
    return [
      values.email !== user.email || values.name !== user.name || values.password !== "*******",
      {
        email: values.email !== user.email,
        name: values.name !== user.name,
        password: values.password !== "*******" && values.password !== "",
      },
    ];
  }, [values]);

  const handleBlurName = () => {
    setDisabledName(true);
  };

  const handleStartEdit = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "*******") setValues({ ...values, password: "" });
  };
  const handleEndEdit = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) setValues({ ...values, password: "*******" });
  };
  const onEditName = (e: MouseEvent<HTMLDivElement>) => {
    setDisabledName(false);
    if (e.currentTarget.previousElementSibling?.tagName !== "INPUT") return;
    const inp = e.currentTarget.previousElementSibling as HTMLInputElement;
    setTimeout(() => inp.focus(), 0);
  };
  useEffect(() => {
    if (!refName.current) return;
    disabledName
      ? refName.current?.classList.add("input__textfield-disabled")
      : refName.current?.classList.remove("input__textfield-disabled");
  }, [disabledName]);

  const handleChangeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const sentData = { ...values };
    for (const key in changedFileds) {
      if (!changedFileds[key as keyof typeof changedFileds])
        delete sentData[key as keyof typeof changedFileds];
    }
    dispatch(editUser(sentData));
  };
  return (
    <form onSubmit={handleChangeSubmit}>
      <div className={cn(styles.profile)}>
        <Input
          ref={refName}
          style={{ color: changedFileds.name ? "#fff" : "#8585AD" }}
          onBlur={handleBlurName}
          type="text"
          disabled={disabledName}
          value={values.name || ""}
          placeholder="Имя"
          onChange={onChange}
          name="name"
          icon="EditIcon"
          onIconClick={onEditName}
        />
        <EmailInput
          onChange={onChange}
          style={{ color: changedFileds.email ? "#fff" : "#8585AD" }}
          value={values.email || ""}
          name={"email"}
          isIcon={true}
        />
        <PasswordInput
          onFocus={handleStartEdit}
          onBlurCapture={handleEndEdit}
          onChange={onChange}
          value={values.password}
          style={{ color: changedFileds.password ? "#fff" : "#8585AD" }}
          name={"password"}
          icon="EditIcon"
        />
      </div>
      {isChanged && (
        <div className="mt-10">
          <Button disabled={!isChanged || isLoading} extraClass="mr-5" htmlType="submit">
            Сохранить
          </Button>
          <Button htmlType="button" onClick={() => setValues({ ...user, password: "*******" })}>
            Отменить
          </Button>
        </div>
      )}
    </form>
  );
}
