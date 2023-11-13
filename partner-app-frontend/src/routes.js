import { Routes, Route } from "react-router-dom";
import Holistic from "./views/Holistic/index";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Holistic />} />
      <Route path="/holistic" element={<Holistic />} />
    </Routes>
  );
};

export default Router;
