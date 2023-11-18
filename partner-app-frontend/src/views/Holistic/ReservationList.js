import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  DateRange,
  Event,
  CalendarViewDay,
  CalendarViewWeek,
  CalendarViewMonth,
} from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { format, startOfMonth } from "date-fns";

const RestaurantCalendar = ({ reservations }) => {
  const [view, setView] = useState("day"); // Default view is 'day'
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date
  const [filteredReservations, setFilteredReservations] = useState([]);

  const handleViewChange = (event, newValue) => {
    setView(newValue);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    // Update filtered reservations based on the selected view and date
    if (view === "day") {
      const currentDate = selectedDate.toDateString();
      const filtered = reservations.filter((reservation) => {
        return (
          new Date(reservation.reservation_datetime).toDateString() ===
          currentDate
        );
      });
      setFilteredReservations(filtered);
    } else if (view === "week") {
      const currentWeekStart = new Date(selectedDate);
      currentWeekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
      const currentWeekEnd = new Date(selectedDate);
      currentWeekEnd.setDate(
        selectedDate.getDate() - selectedDate.getDay() + 6
      );

      const filtered = reservations.filter((reservation) => {
        const reservationDate = new Date(reservation.reservation_datetime);
        return (
          reservationDate >= currentWeekStart &&
          reservationDate <= currentWeekEnd
        );
      });
      setFilteredReservations(filtered);
    } else if (view === "month") {
      const currentMonth = selectedDate.getMonth();
      const currentYear = selectedDate.getFullYear();

      const filtered = reservations.filter((reservation) => {
        const reservationDate = new Date(reservation.reservation_datetime);
        return (
          reservationDate.getMonth() === currentMonth &&
          reservationDate.getFullYear() === currentYear
        );
      });
      setFilteredReservations(filtered);
    }
  }, [view, selectedDate, reservations]);

  // Define the heading based on the selected view
  let heading = "";
  if (view === "day") {
    heading = `Booking for ${format(selectedDate, "do MMMM yyyy")}`;
  } else if (view === "week") {
    const currentWeekStart = new Date(selectedDate);
    currentWeekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
    const currentWeekEnd = new Date(selectedDate);
    currentWeekEnd.setDate(selectedDate.getDate() - selectedDate.getDay() + 6);
    heading = `Booking for Week ${format(selectedDate, "w yyyy")} (${format(
      currentWeekStart,
      "do MMMM yyyy"
    )} - ${format(currentWeekEnd, "do MMMM yyyy")})`;
  } else if (view === "month") {
    const firstDateOfMonth = startOfMonth(selectedDate);
    heading = `Booking for ${format(selectedDate, "MMMM yyyy")} (${format(
      firstDateOfMonth,
      "do MMMM yyyy"
    )} - ${format(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0),
      "do MMMM yyyy"
    )})`;
  }

  return (
    <Container>
      <AppBar position="static" style={{ marginTop: "20px" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="date-range">
            <DateRange />
          </IconButton>
          <Tabs
            value={view}
            onChange={handleViewChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Daily" value="day" icon={<CalendarViewDay />} />
            <Tab label="Weekly" value="week" icon={<CalendarViewWeek />} />
            <Tab label="Monthly" value="month" icon={<CalendarViewMonth />} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Paper elevation={3}>
        <DatePicker
          view={view}
          renderInput={(props) => <input {...props} />}
          value={selectedDate}
          onChange={handleDateChange}
          renderDay={(day, _value, DayProps) => {
            const dayString = day.toLocaleDateString();
            const hasReservation = filteredReservations.some((reservation) => {
              const reservationDate = new Date(
                reservation.reservation_datetime
              );
              return dayString === reservationDate.toLocaleDateString();
            });

            return (
              <div>
                <span>{day.getDate()}</span>
                {hasReservation && <Event fontSize="small" color="primary" />}
              </div>
            );
          }}
        />
      </Paper>
      <div>
        <Typography variant="h6" gutterBottom>
          {heading}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Table Number</TableCell>
                <TableCell>Reservation Time</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Number of Guests</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.reservation_id}>
                  <TableCell>{reservation.table_number}</TableCell>
                  <TableCell>{reservation.reservation_time}</TableCell>
                  <TableCell>{reservation.customer_id}</TableCell>
                  <TableCell>{reservation.number_of_guests}</TableCell>
                  <TableCell>
                    {format(
                      new Date(reservation.reservation_datetime),
                      "do MMMM yyyy"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default RestaurantCalendar;
