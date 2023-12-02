import { Routes, Route } from "react-router-dom";
import SignInWithEmailForm from "./views/Authentication/adminSignin";
import TopMenuItems from "./views/Reports/TopMenuItems";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInWithEmailForm />} />
      <Route path="/top-items" element={<TopMenuItems />} />
    </Routes>
  );
};

export default Router;
