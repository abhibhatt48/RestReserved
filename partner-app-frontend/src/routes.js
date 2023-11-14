import { Routes, Route } from "react-router-dom";
import Holistic from "./views/Holistic/index";
import SignupForm from "./views/Authentication/restaurantSignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/holistic" element={<Holistic />} />
    </Routes>
  );
};

export default Router;
