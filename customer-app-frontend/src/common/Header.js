import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import the logout icon

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("customer_id", "");
    navigate("/signin");
  };
  const navigateToView = () => {
    navigate("/view");
  };
  const navigateToHome = () => {
    navigate("/listrestaurants");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="h6" color="inherit" onClick={navigateToHome}>
          GoodBite
        </Button>

        <div>
          <Button color="inherit" onClick={navigateToView}>
            View Bookings
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
            <ExitToAppIcon /> {/* Logout icon */}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
