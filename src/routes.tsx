import { Routes, Route } from "react-router-dom";

import { Homepage } from "./pages/Homepage";
import { Authentication } from "./pages/Authentication";
import { Match } from "./pages/Match";

export function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/matchs" element={<Match />} />
    </Routes>
  );
}
