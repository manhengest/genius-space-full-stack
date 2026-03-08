import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-page__content">
        <span className="error-page__icon" aria-hidden="true">
          ⚠️
        </span>
        <h1 className="error-page__title">Помилка сервера</h1>
        <p className="error-page__description">
          Виникла помилка при зверненні до сервера. Спробуйте пізніше або перевірте
          підключення.
        </p>
        <Link to="/" className="link-btn link-btn--primary">
          Повернутись на головну
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
