import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import BookingForm from "./BookingForm";
import TimeSlotSelector from "./TimeSlotSelector";
import MenuSelector from "./MenuSelector";

function Booking() {
  const [isMenuSelected, setIsMenuSelected] = useState(false);

  return (
    <div>
      <BookingForm />
      <TimeSlotSelector />
      <FormControlLabel
        control={
          <Checkbox
            checked={isMenuSelected}
            onChange={() => setIsMenuSelected(!isMenuSelected)}
          />
        }
        label="Book Food From Menu (Optional)"
      />
      {isMenuSelected && <MenuSelector />}
    </div>
  );
}

export default Booking;
