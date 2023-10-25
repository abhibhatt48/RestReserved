import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

function BookingForm() {
  const [name, setName] = useState("");
  const [partySize, setPartySize] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div>
      <h2>Table Booking</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="number"
          label="Party Size"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Book Table
        </Button>
      </form>
    </div>
  );
}

export default BookingForm;
