import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MenuItemCard from "./MenuItemCard";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Footer from "../../common/Footer";

function Booking() {
  const [menuItems, setMenuItems] = useState([]);
  const [fetchMenu, setFetchMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch menu items from the API when the checkbox is clicked
  useEffect(() => {
    if (fetchMenu) {
      fetch(
        "https://xt9806b6e1.execute-api.us-east-1.amazonaws.com/default/getMenuItems?restaurantId=12"
      )
        .then((response) => response.json())
        .then((data) => setMenuItems(data[0].Items));
    } else {
      // If the checkbox is unchecked, clear the menu items
      setMenuItems([]);
    }
  }, [fetchMenu]);

  const handleCheckboxChange = () => {
    setFetchMenu(!fetchMenu);
  };

  const handleItemSelect = (item) => {
    // Check if the item is already in the selectedItems array
    const index = selectedItems.findIndex((i) => i.item_id === item.item_id);

    if (index !== -1) {
      // If it's already selected, update the quantity
      const updatedItems = [...selectedItems];
      updatedItems[index].quantity = item.quantity;
      setSelectedItems(updatedItems);
    } else {
      // If it's not selected, add it to the array
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleBookClick = () => {
    // Print the selected items array
    console.log(selectedItems);
  };

  return (
    <>
      <Box m={2} p={2}>
        <Typography variant="h4">Table Booking Page</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={fetchMenu}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Add Items From Menu to this Order(Optional)"
        />
        {fetchMenu && (
          <Grid container spacing={2}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.ItemID}>
                <MenuItemCard item={item} onItemSelect={handleItemSelect} />
              </Grid>
            ))}
          </Grid>
        )}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleBookClick}>
            Book
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Booking;
