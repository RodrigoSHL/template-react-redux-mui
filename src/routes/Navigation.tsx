import React from "react";
import { Routes, Route } from "react-router-dom";
import { Counter } from "../components/Counter/Counter";
import Crud from "../components/Crud/Crud";
import Pokeapi from "../components/Pokeapi/Pokeapi";
import TestComponent from "../components/TestComponent/TestComponent";

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="/pokeapi" element={<Pokeapi />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/" element={<TestComponent />} />
      </Routes>
    </>
  );
};

export default Navigation;
