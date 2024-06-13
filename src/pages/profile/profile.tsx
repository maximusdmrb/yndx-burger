import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "../../utils/cn";
import styles from "./profile.module.scss";
import { ChangeEvent, FocusEvent, FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { User, editUser } from "../../services/slices/user-slice";
import { store } from "../../services/store";

export default function Profile() {
  const { user, isLoading } = useTypedSelector((store) => store.user);
  if (!user) return;
  const [formUser, setFormUser] = useState<User & { password: string }>({ ...user, password: "*******" });
  const [disabledName, setDisabledName] = useState(true);
  const refName = useRef<HTMLInputElement>(null);

  const [isChanged, changedFileds] = useMemo(() => {
    return [
      formUser.email !== user.email || formUser.name !== user.name || formUser.password !== "*******",
      {
        email: formUser.email !== user.email,
        name: formUser.name !== user.name,
        password: formUser.password !== "*******" && formUser.password !== "",
      },
    ];
  }, [formUser]);

  const handleBlurName = () => {
    setDisabledName(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleStartEdit = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "*******") setFormUser({ ...formUser, password: "" });
  };
  const handleEndEdit = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) setFormUser({ ...formUser, password: "*******" });
  };
  const onEditName = (e: MouseEvent<HTMLDivElement>) => {
    setDisabledName(false);
    if (e.currentTarget.previousElementSibling?.tagName !== "INPUT") return;
    const inp = e.currentTarget.previousElementSibling as HTMLInputElement;
    setTimeout(() => inp.focus(), 0);
  };
  useEffect(() => {
    if (!refName.current) return;
    disabledName ? refName.current?.classList.add("input__textfield-disabled") : refName.current?.classList.remove("input__textfield-disabled");
  }, [disabledName]);

  const handleChangeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const sentData = { ...formUser };
    for (const key in changedFileds) {
      if (!changedFileds[key as keyof typeof changedFileds]) delete sentData[key as keyof typeof changedFileds];
    }
    store.dispatch(editUser(sentData));
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
          value={formUser.name || ""}
          placeholder="Имя"
          onChange={handleChange}
          name="name"
          icon="EditIcon"
          onIconClick={onEditName}
        />
        <EmailInput onChange={handleChange} style={{ color: changedFileds.email ? "#fff" : "#8585AD" }} value={formUser.email || ""} name={"email"} isIcon={true} />
        <PasswordInput onFocus={handleStartEdit} onBlurCapture={handleEndEdit} onChange={handleChange} value={formUser.password} style={{ color: changedFileds.password ? "#fff" : "#8585AD" }} name={"password"} icon="EditIcon" />
      </div>
      {isChanged && (
        <div className="mt-10">
          <Button disabled={!isChanged || isLoading} extraClass="mr-5" htmlType="submit" onClick={() => console.log("click")}>
            Сохранить
          </Button>
          <Button htmlType="button" onClick={() => setFormUser({ ...user, password: "*******" })}>
            Отменить
          </Button>
        </div>
      )}
    </form>
  );
}
