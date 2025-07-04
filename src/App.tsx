import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./contexts/AuthContext";

import { CustomRoutes } from "./routes";

export default function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position="bottom-center" />

      <BrowserRouter>
        <AuthProvider>
          <CustomRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
