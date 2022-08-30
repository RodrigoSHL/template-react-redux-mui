import React from "react";
import { Routes, Route } from "react-router-dom";
import { Counter } from "../components/Counter/Counter";
import TestComponent from "../components/TestComponent/TestComponent";

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/test" element={<TestComponent />} />

      </Routes>
    </>
  );
};

export default Navigation;
