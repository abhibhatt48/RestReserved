// Author: Aayush Yogesh Pandya (B00939670)
import { Routes, Route } from "react-router-dom";

import Booking from "./views/Booking/index";

const Router = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Booking />} /> */}
      <Route path="/booking" element={<Booking />} />
    </Routes>
  );
};

export default Router;
