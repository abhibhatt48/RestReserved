import React, { useEffect, useState } from 'react';
import './ViewBooking.css';
function ViewBooking() {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Fetch the booking details from your API
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch('https://auxehb42pg.execute-api.us-east-1.amazonaws.com/prod/view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reservation_id: 'faf2c8be-ab71-4887-8662-44139bd9f945' }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("dataa", data.body);
          const parsedData = JSON.parse(data.body);
          setBookingDetails(parsedData.reservation);
        } else {
          console.error('Failed to fetch booking details');
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, []);

  return (
    <div className="booking-details-container">
      <h1>Booking Details</h1>
      {bookingDetails ? (
        <div className="booking-details">
          <div className="detail-row">
            <p>Reservation Date:</p>
            <p>{bookingDetails.reservation_date}</p>
          </div>
          <div className="detail-row">
            <p>Booking Time:</p>
            <p>{bookingDetails.booking_time}</p>
          </div>
          <div className="detail-row">
            <p>Number of Guests:</p>
            <p>{bookingDetails.number_of_guests}</p>
          </div>
          <div className="detail-row">
            <p>Special Requests:</p>
            <p>{bookingDetails.special_requests}</p>
          </div>
          <h2>Menu Items</h2>
          <ul className="menu-items-list">
            {bookingDetails.menu_items ? (
              bookingDetails.menu_items.map((menuItem, index) => (
                <li key={index} className="menu-item">
                  <p>Item Name: {menuItem.item_name}</p>
                  <p>Quantity: {menuItem.quantity}</p>
                </li>
              ))
            ) : (
              <p>No menu items available</p>
            )}
          </ul>
          <div className="buttons-container">
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
          </div>
        </div>
      ) : (
        <p>Loading booking details</p>
      )}
    </div>
  );
}
export default ViewBooking;
