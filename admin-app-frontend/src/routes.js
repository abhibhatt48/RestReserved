import { Routes, Route } from "react-router-dom";
import App from "./App";
import SignInWithEmailForm from "./views/Authentication/adminSignin";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInWithEmailForm />} />
    </Routes>
  );
};

export default Router;
