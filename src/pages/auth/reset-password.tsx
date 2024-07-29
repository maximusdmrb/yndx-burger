import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import Typography from "../../components/typography/typography";
import styles from "./auth.module.scss";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import useForm from "../../hooks/use-form";

export default function ResetPassword() {
  const { values, onChange } = useForm({ password: "", token: "" });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .reset(values)
      .then((res) => {
        if (res.success) {
          localStorage.removeItem("fogot");
          return navigate("/login", { state: { reset: true, ...location.state } });
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  if (!localStorage.getItem("fogot")) return <Navigate to={"/"} replace={true} />;
  return (
    <>
      <div className={`${styles.column}`}>
        <form onSubmit={handleResetPassword}>
          {error && <Typography className={styles.error}>{error}</Typography>}
          <Typography variant="medium">Восстановление пароля</Typography>
          <PasswordInput required onChange={onChange} value={values.password} name={"password"} extraClass="mb-2" />
          <Input required type={"text"} placeholder={"Код из письма"} value={values.token} onChange={onChange} name="token" error={false} errorText={"Ошибка"} size={"default"} extraClass="ml-1" />
          <Button disabled={isLoading} extraClass={styles.btn} htmlType="submit">
            {isLoading ? "Подождите..." : "Восстановить"}
          </Button>
        </form>
        <div className="mt-15">
          <Typography variant="inactive">
            Вспомнили пароль?{" "}
            <Link to="/login" state={location.state}>
              <Button htmlType="button" type="secondary" size="medium">
                Войти
              </Button>
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}
