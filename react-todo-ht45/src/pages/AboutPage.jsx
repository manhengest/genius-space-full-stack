const AboutPage = () => {
  return (
    <div className="about-page">
      <h2 className="about-page__title">Про застосунок</h2>

      <section className="about-page__section">
        <h3>Що це?</h3>
        <p>
          Todo List — це застосунок для управління завданнями. Ви можете створювати,
          редагувати, відмічати виконаними та видаляти завдання. Всі дані зберігаються
          на локальному сервері через JSON Server.
        </p>
      </section>

      <section className="about-page__section">
        <h3>Технології</h3>
        <ul className="about-page__tech-list">
          <li><strong>React 19</strong> — UI бібліотека</li>
          <li><strong>React Router</strong> — маршрутизація</li>
          <li><strong>TanStack Query</strong> — кешування та робота з серверними даними</li>
          <li><strong>Vite</strong> — збірка</li>
          <li><strong>JSON Server</strong> — mock API</li>
          <li><strong>Sass</strong> — стилі</li>
        </ul>
      </section>

      <section className="about-page__section about-page__author">
        <h3>Про автора</h3>
        <div className="about-page__author-card">
          <div className="about-page__avatar">
            <span className="about-page__avatar-placeholder">👨‍💻</span>
          </div>
          <div className="about-page__author-info">
            <p>
              Розробник застосунку, який любить створювати корисні та зручні інструменти.
              Проект створено в рамках навчання React та сучасної фронтенд-розробки.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
