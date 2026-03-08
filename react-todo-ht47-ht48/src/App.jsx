import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PageLoader from "./components/PageLoader";
import "./App.scss";

const Layout = lazy(() => import("./components/Layout.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const TodoListPage = lazy(() => import("./pages/TodoListPage.jsx"));
const EditTodoPage = lazy(() => import("./pages/EditTodoPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="todo-list"
                element={
                  <PrivateRoute>
                    <TodoListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="todo-list/:id"
                element={
                  <PrivateRoute>
                    <EditTodoPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="about"
                element={
                  <PrivateRoute>
                    <AboutPage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/error-page" element={<Layout />}>
              <Route index element={<ErrorPage />} />
            </Route>
            <Route path="/not-found-page" element={<Layout />}>
              <Route index element={<NotFoundPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/not-found-page" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
