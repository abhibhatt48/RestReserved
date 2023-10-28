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
import { useNavigate, useParams } from "react-router-dom";

function EditReservation() {
  const [menuItems, setMenuItems] = useState([]);
  const [fetchMenu, setFetchMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [numGuests, setNumGuests] = useState();
  const [special_requests, setSpecial_requests] = useState();
  const [restaurant_id, setRestaurant_id] = useState();
  const [date, setDate] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [tableNumbers, setTableNumbers] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [timeSlotsData, setTimeSlotsData] = useState({});
  const [itemQuantities, setItemQuantities] = useState({});
  const navigate = useNavigate();
  let reservationData = {};
  const { reservationId } = useParams();

  useEffect(() => {
    // Fetch reservation details based on the reservationId
    console.log(reservationId);
    axios
      .post(
        "https://auxehb42pg.execute-api.us-east-1.amazonaws.com/prod/get-single-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reservationId: reservationId,
          }),
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const res = JSON.parse(response.data.body);
          reservationData = res.reservation;
          console.log("reservationData", reservationData);
          // Pre-populate the form fields with reservation details
          setNumGuests(reservationData.number_of_guests);
          setSpecial_requests(reservationData.special_requests);
          setDate(reservationData.reservation_date);
          setTableNumber(reservationData.table_number);
          setTimeSlot(reservationData.reservation_time);
          setSelectedItems(reservationData.menu_items);
          setRestaurant_id(reservationData.restaurant_id);
          // Fetch menu items if necessary
          if (fetchMenu) {
            console.log("reservationData", reservationData);
            fetch(
              `https://xt9806b6e1.execute-api.us-east-1.amazonaws.com/default/getMenuItems?restaurantId=${reservationData.restaurant_id}`
            )
              .then((response) => response.json())
              .then((data) => setMenuItems(data[0].Items));
          }
        }
      })
      .catch((error) => {
        console.error("Failed to fetch reservation details:", error);
      });
  }, [reservationId]);

  useEffect(() => {
    console.log("reservationDataat123", reservationData);
    const requestBody = {
      restaurant_id: reservationData.restaurant_id,
      booking_date: date,
      opening_time: "07:00",
      closing_time: "18:00",
      no_of_tables: "3",
    };

    // Call the API to get table details
    axios
      .post(
        "https://auxehb42pg.execute-api.us-east-1.amazonaws.com/prod/get-table-details",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const data = JSON.parse(response.data.body);

          // Update tableNumbersData with the table names
          const tableNumbersData = Object.keys(data.availability);
          console.log(data);
          // Set the table numbers
          setTableNumbers(tableNumbersData);

          // Initially, set tableNumber to the first table in the list
          setTableNumber(tableNumbersData[0]);

          setTimeSlotsData(data.availability);

          // Set the time slots based on the selected table
          setTimeSlots(data.availability[tableNumbersData[0]]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch table details:", error);
      });

    if (fetchMenu) {
      fetch(
        `https://xt9806b6e1.execute-api.us-east-1.amazonaws.com/default/getMenuItems?restaurantId=${restaurant_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Store the quantity of each item
          const quantities = {};
          data[0].Items.forEach((item) => {
            quantities[item.ItemID] = 0;
          });
          setMenuItems(data[0].Items);
          setItemQuantities(quantities);
        });
    } else {
      // If the checkbox is unchecked, clear the menu items
      setMenuItems([]);
    }
  }, [fetchMenu, date]);

  const handleCheckboxChange = () => {
    setFetchMenu(!fetchMenu);
  };

  const handleTableNumberChange = (e) => {
    const selectedTable = e.target.value;
    setTableNumber(selectedTable);
    console.log("timeSlotsData", timeSlotsData);
    console.log("selectedTable", selectedTable);
    // Set the time slots based on the selected table
    setTimeSlots(timeSlotsData[selectedTable]);
  };

  const handleItemSelect = (item) => {
    const itemId = item.ItemID;

    const updatedItems = { ...selectedItems };

    if (itemId in itemQuantities) {
      // Update the quantity in the state
      updatedItems[itemId] = { ...item, quantity: itemQuantities[itemId] + 1 };
      setItemQuantities({
        ...itemQuantities,
        [itemId]: itemQuantities[itemId] + 1,
      });
    } else {
      updatedItems[itemId] = { ...item, quantity: 1 };
      setItemQuantities({ ...itemQuantities, [itemId]: 1 });
    }

    // Update the selectedItems state with the updated item
    setSelectedItems(updatedItems);
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
        "https://auxehb42pg.execute-api.us-east-1.amazonaws.com/prod/edit",
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
        alert("Update Successful");
        navigate("/listrestaurants");
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        console.error("Booking error:", error);
        alert("Update Unuccessful");
        navigate("/listrestaurants");
      });
  };

  return (
    <>
      <Typography variant="h4">Edit Reservation</Typography>
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
            onChange={handleTableNumberChange}
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
                <MenuItemCard
                  item={item}
                  onItemSelect={handleItemSelect}
                  quantity={itemQuantities[item.ItemID] || 0} // Show the previously booked quantity
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleBookClick}>
            Update
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default EditReservation;
