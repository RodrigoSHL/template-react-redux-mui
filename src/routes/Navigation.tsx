import React from "react";
import { Routes, Route } from "react-router-dom";
import { Counter } from "../components/Counter/Counter";
import Pokeapi from "../components/Pokeapi/Pokeapi";
import TestComponent from "../components/TestComponent/TestComponent";

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="/pokeapi" element={<Pokeapi />} />
      </Routes>
    </>
  );
};

export default Navigation;
