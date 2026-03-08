import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import TodoListPage from "./pages/TodoListPage.jsx";
import EditTodoPage from "./pages/EditTodoPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="todo-list" element={<TodoListPage />} />
          <Route path="todo-list/:id" element={<EditTodoPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
