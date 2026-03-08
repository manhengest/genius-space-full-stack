import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/todo-list", label: "Туду Ліст", end: false },
  { to: "/about", label: "Про застосунок", end: true },
];

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
