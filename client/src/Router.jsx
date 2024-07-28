import { Routes, Route } from "react-router-dom";
import { ChooseHotspot, Home, Itinerary, SItinerary, NotFound } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plans/:id" element={<SItinerary />} />
      <Route path="/wb" element={<ChooseHotspot />} />
      <Route path="/wb/:id" element={<Itinerary />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
