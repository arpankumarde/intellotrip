import { Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plans/:id" element={<Home />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
