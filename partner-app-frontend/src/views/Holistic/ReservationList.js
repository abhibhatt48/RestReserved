import React, { useState } from "react";

const ReservationList = ({ reservations }) => {
  // State to track the selected view (daily, weekly, or monthly)
  const [view, setView] = useState("daily");

  // Function to filter reservations based on the selected view
  const filterReservationsByView = () => {};

  const filteredReservations = filterReservationsByView();

  return (
    <div>
      <h1>Restaurant Reservation View</h1>
      <div>
        {/* Add buttons or a dropdown to switch between daily, weekly, and monthly views */}
        <button onClick={() => setView("daily")}>Daily View</button>
        <button onClick={() => setView("weekly")}>Weekly View</button>
        <button onClick={() => setView("monthly")}>Monthly View</button>
      </div>
      <h2>Tables Booked</h2>
      {/* Render the list of tables booked with their time intervals */}
      <ul>
        {filteredReservations.map((reservation) => (
          <li key={reservation.reservation_id}>
            Table: {reservation.table_number}
            <br />
            Time Interval: {reservation.reservation_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
