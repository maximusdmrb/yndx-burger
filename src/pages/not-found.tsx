import { Link } from "react-router-dom";
import Typography from "../components/typography/typography";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Page404() {
  return (
    <div>
      <Typography variant="large" className="mt-10">
        Страницы не существует
      </Typography>
      <Typography variant="digits" className="mt-5">
        404 Not Found
      </Typography>
      <Link to={"/"}>
        <Button extraClass="mt-10" htmlType="button">
          На главную
        </Button>
      </Link>
    </div>
  );
}
