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

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
          GoodBite
        </Typography>

        {/* Add the Logout button with the icon */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
          <ExitToAppIcon /> {/* Logout icon */}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
