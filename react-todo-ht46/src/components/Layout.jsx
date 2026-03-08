import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.scss";

const Layout = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-header__title">Мої завдання</h1>
        <Navbar />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
