import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/todo-list", label: "Туду Ліст", end: false },
  { to: "/about", label: "Про застосунок", end: true },
];

const Navbar = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {navItems.map(({ to, label, end }) => (
          <li key={to} className="navbar__item">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              end={end}
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li className="navbar__item">
          {!isLoading &&
            (isAuthenticated ? (
              <button
                type="button"
                className="navbar__link navbar__link--btn"
                onClick={handleLogout}
              >
                Вийти
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                Увійти
              </NavLink>
            ))}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
