import { Routes, Route } from "react-router-dom";
import Holistic from "./views/Holistic/index";
import SignupForm from "./views/Authentication/restaurantSignUp";
import SignInWithEmailForm from "./views/Authentication/restaurantSignin";
import SignInWithGmailPage from './views/Authentication/restaurantGmailSignIn';
import RestaurantDetailsForm from "./views/Restaurant_Details/addRestaurantDetails";
import AddMenuItemForm from "./views/Restaurant_Details/addRestaurantMenu";
import List_Restaurant from "./views/List_Restaurant/RestaurantList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/addRestaurantDetails" element={<RestaurantDetailsForm />} />
      <Route path="/addRestaurantMenu" element={<AddMenuItemForm />} />
      <Route path="/signin" element={<SignInWithEmailForm />} />
      <Route path="/googleSignIn" element={<SignInWithGmailPage/>}/>
      <Route path="/ListRestaurant" element={<List_Restaurant />} />
      <Route path="/holistic" element={<Holistic />} />
    </Routes>
  );
};

export default Router;
