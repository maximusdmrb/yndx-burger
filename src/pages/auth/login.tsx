import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import Typography from "../../components/typography/typography";
import styles from "./auth.module.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { store } from "../../services/store";
import { clearError, login } from "../../services/slices/user-slice";
import { useTypedSelector } from "../../hooks/use-typed-selector";

export default function Login() {
  const [form, setForm] = useState({ email: "maximstelmashenko@yandex.ru", password: "m12345" });
  const { isLoading, error } = useTypedSelector((store) => store.user);
  const location = useLocation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    store.dispatch(clearError());
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.dispatch(login(form)).then((action) => {
      if (action.payload?.success) {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
  };
  return (
    <>
      <div className={`${styles.column}`}>
        <form onSubmit={handleLogin}>
          {location.state?.reset && <Typography className={styles.msg}>Пароль изменен успешно</Typography>}
          {error && <Typography className={styles.error}>{error}</Typography>}
          <Typography variants="medium">Вход</Typography>
          {/* @ts-ignore */}
          <Input required type={"email"} placeholder={"Email"} value={form.email} onChange={handleChange} name="email" error={false} errorText={"Ошибка"} size={"default"} extraClass="ml-1" />
          <PasswordInput onChange={handleChange} value={form.password} name={"password"} extraClass="mb-2" />
          <Button disabled={isLoading} extraClass={styles.btn} name="submit" htmlType="submit">
            {isLoading ? "Подождите..." : "Войти"}
          </Button>
        </form>
        <div className="mt-15">
          <Typography variants="inactive">
            Вы новый пользователь?{" "}
            <Link to="/register" state={location.state}>
              <Button htmlType="button" type="secondary" size="medium">
                Зарегистрироваться
              </Button>
            </Link>
          </Typography>
          <Typography variants="inactive">
            Забыли пароль?{" "}
            <Link to="/forgot-password" state={location.state}>
              <Button htmlType="button" type="secondary" size="medium">
                Восстановить пароль
              </Button>
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}
