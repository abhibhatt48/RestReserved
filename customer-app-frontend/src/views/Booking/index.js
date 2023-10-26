import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MenuItemCard from "./MenuItemCard";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Footer from "../../common/Footer";
import axios from "axios";

function Booking() {
  const [menuItems, setMenuItems] = useState([]);
  const [fetchMenu, setFetchMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [numGuests, setNumGuests] = useState();
  const [special_requests, setSpecial_requests] = useState();
  const [date, setDate] = useState();
  const [tableNumber, setTableNumber] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [tableNumbers, setTableNumbers] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const tableNumbersData = [
      "Table 1",
      "Table 2",
      "Table 3",
      "Table 4",
      "Table 5",
      "Table 6",
      "Table 7",
      "Table 8",
      "Table 9",
      "Table 10",
    ];
    const openingTime = 11;
    const closingTime = 20;
    const timeSlotsData = [];

    // Calculate time slots based on opening and closing times
    for (let i = openingTime; i < closingTime; i++) {
      timeSlotsData.push(`${i}:00 - ${i + 1}:00`);
    }
    setTableNumbers(tableNumbersData);
    setTimeSlots(timeSlotsData);

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
    const customer_id = localStorage.getItem("customer_id");
    const restaurant_id = localStorage.getItem("restaurant_id");
    const requestBody = {
      customer_id,
      restaurant_id,
      reservation_date: date,
      reservation_time: timeSlot,
      number_of_guests: numGuests,
      special_requests: special_requests,
      table_number: tableNumber,
      menu_items: selectedItems,
    };

    // Make the API call using Axios
    axios
      .post(
        "https://auxehb42pg.execute-api.us-east-1.amazonaws.com/prod/book",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Handle the API response, e.g., show a success message
        console.log("Booking successful:", response.data);
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        console.error("Booking error:", error);
      });
  };

  return (
    <>
      <Typography variant="h4">Table Booking Page</Typography>
      <Box m={2} p={2} display="flex" flexDirection="column">
        <Box mb={2}>
          <TextField
            label="Number of Guests"
            type="number"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            variant="outlined"
            style={{ width: "100%" }} // Fixed width
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            variant="outlined"
            style={{ width: "100%" }} // Fixed width
          />
        </Box>
        <Box mb={2}>
          <TextField
            select
            label="Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            variant="outlined"
            style={{ width: "100%" }} // Fixed width
          >
            {tableNumbers.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={2}>
          <TextField
            select
            label="Time Slot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            variant="outlined"
            style={{ width: "100%" }} // Fixed width
          >
            {timeSlots.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={2}>
          <TextField
            label="Special Requests"
            type="text"
            value={special_requests}
            onChange={(e) => setSpecial_requests(e.target.value)}
            variant="outlined"
            style={{ width: "100%" }} // Fixed width
          />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={fetchMenu}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Add Items From Menu to this Order (Optional)"
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
