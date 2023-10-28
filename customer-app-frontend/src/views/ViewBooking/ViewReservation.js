import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./ViewBooking.css";
import Footer from "../../common/Footer";
import { useNavigate } from "react-router-dom";

function ViewBooking() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the user ID from localStorage (you need to implement this)
    const customer_id = localStorage.getItem("customer_id");

    // Fetch the user's bookings from your API
    const fetchUserBookings = async (customer_id) => {
      try {
        const response = await fetch(
          "https://auxehb42pg.execute-api.us-east-1.amazonaws.com/prod/view",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer_id: customer_id,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.body) {
            const bodyData = JSON.parse(data.body);
            if (bodyData.reservations) {
              setBookings(bodyData.reservations);
            } else {
              console.error("No reservations found in the response.");
            }
          } else {
            console.error("Invalid data format in API response.");
          }
          setLoading(false);
        } else {
          console.error("Failed to fetch user bookings");
        }
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    if (customer_id) {
      setUser({ id: customer_id });
      fetchUserBookings(customer_id);
    }
  }, []);

  const isBookingExpired = (booking) => {
    const expirationTime = new Date(booking.booking_expiration_time).getTime();
    const currentTime = new Date().getTime();
    return currentTime > expirationTime;
  };

  const handleEditBooking = (reservationId) => {
    navigate(`/edit/${reservationId}`);
  };

  const handleDeleteBooking = async (reservationId) => {
    try {
      const response = await fetch(
        "https://auxehb42pg.execute-api.us-east-1.amazonaws.com/prod/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reservation_id: reservationId,
          }),
        }
      );

      if (response.ok) {
        // Handle successful deletion, e.g., remove the deleted booking from the state
        const updatedBookings = bookings.filter(
          (booking) => booking.reservation_id !== reservationId
        );
        setBookings(updatedBookings);
      } else {
        console.error("Failed to delete the booking");
      }
    } catch (error) {
      console.error("Error deleting the booking:", error);
    }
  };

  return (
    <>
      <Box className="booking-details-container">
        <Typography variant="h4">User's Bookings</Typography>
        {loading ? (
          <Typography>Loading user bookings</Typography>
        ) : (
          <Box>
            {bookings.length === 0 ? (
              <Typography>No bookings found</Typography>
            ) : (
              <Box>
                {bookings.map((booking, index) => (
                  <Card key={index} className="booking-details">
                    <CardContent>
                      <Typography variant="h6">
                        Reservation Date: {booking.reservation_date}
                      </Typography>
                      <Typography variant="body1">
                        Booking Time: {booking.booking_time}
                      </Typography>
                      <Typography variant="body1">
                        Number of Guests: {booking.number_of_guests}
                      </Typography>
                      <Typography variant="body1">
                        Special Requests: {booking.special_requests}
                      </Typography>
                      <Typography variant="h6">Menu Items</Typography>
                      <List>
                        {booking.menu_items ? (
                          booking.menu_items.map((menuItem, itemIndex) => (
                            <ListItem key={itemIndex}>
                              <ListItemText
                                primary={`Item Name: ${menuItem.item_name}`}
                                secondary={`Quantity: ${menuItem.quantity}`}
                              />
                            </ListItem>
                          ))
                        ) : (
                          <Typography>No menu items available</Typography>
                        )}
                      </List>
                      <Box>
                        {isBookingExpired(booking) ? (
                          <Typography variant="body2" color="textSecondary">
                            Cannot Edit This Order
                          </Typography>
                        ) : (
                          <Box>
                            <Button
                              onClick={() =>
                                handleEditBooking(booking.reservation_id)
                              }
                              variant="outlined"
                              color="primary"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() =>
                                handleDeleteBooking(booking.reservation_id)
                              }
                              variant="outlined"
                              color="secondary"
                            >
                              Delete
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default ViewBooking;
