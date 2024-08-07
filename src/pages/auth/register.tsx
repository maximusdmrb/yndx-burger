import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Typography from "../../components/typography/typography";
import styles from "./auth.module.scss";
import { Link, useLocation } from "react-router-dom";
import { register } from "../../services/slices/user-slice";
import { useDispatch, useSelector } from "../../services/store";
import useForm from "../../hooks/use-form";

export default function Register() {
  const { values, onChange } = useForm({ name: "", password: "", email: "" });

  const isLoading = useSelector((store) => store.user.isLoading);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(values)).then((action) => {
      if (action.payload.success) {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
  };

  return (
    <>
      <div className={`${styles.column}`}>
        <form onSubmit={handleRegister}>
          <Typography variant="medium">Регистрация</Typography>
          <Input
            autoComplete="given-name"
            required
            type={"text"}
            placeholder={"Имя"}
            value={values.name}
            onChange={onChange}
            name="name"
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <EmailInput
            autoComplete="email"
            onChange={onChange}
            value={values.email}
            name={"email"}
            isIcon={false}
          />
          <PasswordInput
            autoComplete="new-password"
            onChange={onChange}
            value={values.password}
            name={"password"}
            extraClass="mb-2"
          />
          <Button disabled={isLoading} extraClass={styles.btn} htmlType="submit">
            {isLoading ? "Подождите..." : "Зарегистрироваться"}
          </Button>
        </form>
        <div className="mt-15">
          <Typography variant="inactive">
            Уже зарегистрированы?{" "}
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
