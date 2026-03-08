import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page__hero">
        <h2 className="home-page__title">Ласкаво просимо до вашого Todo List</h2>
        <p className="home-page__description">
          Тут ви можете керувати своїми завданнями: додавати нові, редагувати,
          відмічати виконані та видаляти непотрібні. Простий та зручний інструмент
          для організації вашого дня.
        </p>
        <Link to="/todo-list" className="link-btn link-btn--primary">
          Розпочати
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
