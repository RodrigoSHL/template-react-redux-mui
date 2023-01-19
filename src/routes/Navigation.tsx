import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Calendar from "../components/Calendar/CalendarPage";
import CalendarPublic from "../components/CalendarPublic/CalendarPublicPage";
import { Counter } from "../components/Counter/Counter";
import Crud from "../components/Crud/Crud";
import Pokeapi from "../components/Pokeapi/Pokeapi";
import TestComponent from "../components/TestComponent/TestComponent";
import { useAuthStore } from "../hooks/useAuthStore";

const Navigation = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            <Route path="/calendar" element={<CalendarPublic />} />
            <Route path="/calendar/:id" element={<CalendarPublic />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/calendar" />} />
          </>
        ) : (
          <>
            <Route path="/counter" element={<Counter />} />
            <Route path="/test" element={<TestComponent />} />
            <Route path="/pokeapi" element={<Pokeapi />} />
            <Route path="/crud" element={<Crud />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/" element={<TestComponent />} />
            {/* <Route path="/*" element={<Navigate to="/" />} /> */}
          </>
        )}
      </Routes>
    </>
  );
};

export default Navigation;
