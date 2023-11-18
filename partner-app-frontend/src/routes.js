import { Routes, Route } from "react-router-dom";
import Holistic from "./views/Holistic/index";
import SignupForm from "./views/Authentication/restaurantSignUp";
import SignInWithEmailForm from "./views/Authentication/restaurantSignin";
import SignInWithGmailPage from './views/Authentication/restaurantGmailSignIn';
import RestaurantDetailsForm from "./views/Restaurant_Details/addRestaurantDetails";
import AddMenuItemForm from "./views/Restaurant_Details/addRestaurantMenu";
import MenuDisplay from "./views/menu";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/addRestaurantDetails" element={<RestaurantDetailsForm />} />
      <Route path="/addRestaurantMenu" element={<AddMenuItemForm />} />
      <Route path="/signin" element={<SignInWithEmailForm />} />
      <Route path="/googleSignIn" element={<SignInWithGmailPage/>}/>
      <Route path="/holistic" element={<Holistic />} />
      <Route path="/menu" element={<MenuDisplay/>}/>
    </Routes>
  );
};

export default Router;
