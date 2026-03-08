import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <span className="not-found-page__code" aria-hidden="true">
          404
        </span>
        <h1 className="not-found-page__title">Сторінку не знайдено</h1>
        <p className="not-found-page__description">
          Запитана сторінка не існує. Перевірте адресу або поверніться на головну.
        </p>
        <Link to="/" className="link-btn link-btn--primary">
          Повернутись на головну
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
