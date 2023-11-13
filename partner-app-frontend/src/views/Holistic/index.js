import React, { useEffect, useState } from "react";
import ReservationList from "./ReservationList";

function Holistic() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("API_ENDPOINT")
      .then((response) => response.json())
      .then((data) => {
        setReservations(data.reservations);
      })
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  return (
    <div className="App">
      <ReservationList reservations={reservations} />
    </div>
  );
}

export default Holistic;
