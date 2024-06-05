import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import Typography from "../../components/typography/typography";
import styles from "./auth.module.scss";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: "maximstelmashenko@yandex.ru" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFogotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await api.fogot(form);
    if (res.success) {
      localStorage.setItem("fogot", "true");
      return navigate("/reset-password", { state: location.state });
    }
    setError("Что-то пошло не так, попробуйте снова");
    setIsLoading(false);
  };
  return (
    <>
      <div className={`${styles.column}`}>
        <form onSubmit={handleFogotPassword}>
          {error && <Typography className={styles.error}>{error}</Typography>}
          <Typography variants="medium">Восстановление пароля</Typography>
          <EmailInput required placeholder={"Email"} value={form.email} onChange={handleChange} name="email" size={"default"} extraClass="ml-1" />
          <Button disabled={isLoading} extraClass={styles.btn} htmlType="submit">
            {isLoading ? "Подождите..." : "Запросить код"}
          </Button>
        </form>
        <div className="mt-15">
          <Typography variants="inactive">
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
