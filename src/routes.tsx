import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { Context } from "./contexts/AuthContext";

import { Homepage } from "./pages/Homepage";
import { Authentication } from "./pages/Authentication";
import { Match } from "./pages/Match";

export function CustomRoutes() {
  const { isAuthenticated } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {!isAuthenticated && (
        <Route path="/login" element={<Authentication />} />
      )}
      <Route path="/matches" element={<Match />} />
    </Routes>
  );
}
