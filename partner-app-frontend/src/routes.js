import { Routes, Route } from "react-router-dom";
import Holistic from "./views/Holistic/index";
import ViewBooking from "./views/ViewBooking/ViewReservation";
import EditReservation from "./views/EditBooking";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Holistic />} />
      <Route path="/holistic" element={<Holistic />} />
      <Route path="/view" element={<ViewBooking />} />
      <Route path="/edit/:reservationId" element={<EditReservation />} />
    </Routes>
  );
};

export default Router;
