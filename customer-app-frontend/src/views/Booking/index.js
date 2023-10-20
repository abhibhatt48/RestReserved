// App.js
import React, { useState } from "react";
import BookingForm from "./BookingForm";
import TimeSlotSelector from "./TimeSlotSelector";
import MenuSelector from "./MenuSelector";

function Booking() {
  const [isMenuSelected, setIsMenuSelected] = useState(false);

  // Handle API call and booking logic

  return (
    <div>
      <BookingForm />
      <TimeSlotSelector />
      <label>
        <input
          type="checkbox"
          checked={isMenuSelected}
          onChange={() => setIsMenuSelected(!isMenuSelected)}
        />
        Select Menu Items
      </label>
      {isMenuSelected && <MenuSelector />}
    </div>
  );
}

export default Booking;
