import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import Typography from "../../components/typography/typography";
import styles from "./auth.module.scss";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { clearError, login } from "../../services/slices/user-slice";
import { useDispatch, useSelector } from "../../hooks/use-typed-selector";
import useForm from "../../hooks/use-form";

export default function Login() {
  const { values, onChange } = useForm({ email: "", password: "" });
  const { isLoading, error } = useSelector((store) => store.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(values)).then((action) => {
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
          <Typography variant="medium">Вход</Typography>
          <Input autoComplete="email" required type={"email"} placeholder={"Email"} value={values.email} onChange={onChange} name="email" error={false} errorText={"Ошибка"} size={"default"} extraClass="ml-1" />
          <PasswordInput autoComplete="current-password" onChange={onChange} value={values.password} name={"password"} extraClass="mb-2" />
          <Button disabled={isLoading} extraClass={styles.btn} name="submit" htmlType="submit">
            {isLoading ? "Подождите..." : "Войти"}
          </Button>
        </form>
        <div className="mt-15">
          <Typography variant="inactive">
            Вы новый пользователь?{" "}
            <Link to="/register" state={location.state}>
              <Button htmlType="button" type="secondary" size="medium">
                Зарегистрироваться
              </Button>
            </Link>
          </Typography>
          <Typography variant="inactive">
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
