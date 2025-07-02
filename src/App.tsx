import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CustomRoutes } from "./routes";

export default function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position="bottom-center" />

      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </>
  );
}
