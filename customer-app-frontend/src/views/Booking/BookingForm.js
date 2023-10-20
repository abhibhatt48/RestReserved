// BookingForm.js
import React, { useState } from "react";

function BookingForm() {
  const [name, setName] = useState("");
  const [partySize, setPartySize] = useState(1);

  // Handle form submission and API call

  return (
    <div>
      <h2>Table Booking</h2>
      <form>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Party Size"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        />
        <button>Book Table</button>
      </form>
    </div>
  );
}

export default BookingForm;
