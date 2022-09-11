import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Auth/Login";
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

  return (
    <>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            <Route path="/auth/*" element={<Login />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            <Route path="/counter" element={<Counter />} />
            <Route path="/test" element={<TestComponent />} />
            <Route path="/pokeapi" element={<Pokeapi />} />
            <Route path="/crud" element={<Crud />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<TestComponent />} />
            {/* <Route path="/*" element={<Navigate to="/" />} /> */}
          </>
        )}
      </Routes>
    </>
  );
};

export default Navigation;
