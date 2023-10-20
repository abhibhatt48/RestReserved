import { Routes, Route } from "react-router-dom";

import Booking from "./views/Booking/index";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Booking />} />
    </Routes>
  );
};

export default Router;
