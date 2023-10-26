import { Routes, Route } from "react-router-dom";

import Booking from "./views/Booking/index";
import ViewBooking from "./views/ViewBooking/ViewReservation";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Booking />} />
      <Route path="/view" element={<ViewBooking/>}/>
    </Routes>
  );
};

export default Router;
