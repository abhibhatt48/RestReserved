import { Routes, Route } from "react-router-dom";
import Holistic from "./views/Holistic/index";
import SignupForm from "./views/Authentication/restaurantSignUp";
import SignInWithEmailForm from "./views/Authentication/restaurantSignin";
import SignInWithGmailPage from './views/Authentication/restaurantGmailSignIn';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/signin" element={<SignInWithEmailForm />} />
      <Route path="/googleSignIn" element={<SignInWithGmailPage/>}/>
      <Route path="/holistic" element={<Holistic />} />
    </Routes>
  );
};

export default Router;