// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./pages/Chat"; // previously Main.jsx
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContextProvider from "./context/contextProvider";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <Chat />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
