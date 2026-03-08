import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.scss";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, isLoading, login, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isLoading, isAuthenticated, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const ok = await login();
      if (ok) {
        navigate(from, { replace: true });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader__spinner" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-page__card">
        <h2 className="login-page__title">Вхід</h2>
        <p className="login-page__subtitle">
          Це емуляція авторизації. Натисніть кнопку для входу.
        </p>
        <form onSubmit={handleSubmit} className="login-page__form">
          {authError && (
            <div className="error-message">
              <p>{authError.message}</p>
              <p className="error-message__hint">
                Переконайтесь, що JSON-server запущено: <code>npm run server</code>
              </p>
            </div>
          )}
          <button
            type="submit"
            className="btn btn--primary login-page__btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Вхід…" : "Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
