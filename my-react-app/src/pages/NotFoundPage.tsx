import {Link} from "react-router-dom";

function NotFoundPage() {
  return (
      <>
        <h1>404</h1>
        <p>Страница не найдена</p>
        <Link to="/">На главную</Link>
      </>
  )
}

export default NotFoundPage;