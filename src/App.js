// todo-app/src/App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MAIN from "./pages/Main";
import EditTodo from "./pages/Edit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<MAIN />} />
          <Route path="/edit/:id" element={<EditTodo/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
