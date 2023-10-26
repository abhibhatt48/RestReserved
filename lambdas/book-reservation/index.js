const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");

const serviceAccount = require("./high-radius-401215-firebase-adminsdk-c4bv1-1ba4657cbc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://high-radius-401215.firebaseio.com",
});

const firestore = admin.firestore();

exports.handler = async (event) => {
  console.log("event", event);
  const requestBody = event;

  const {
    customer_id,
    restaurant_id,
    reservation_date,
    reservation_time,
    table_number,
    number_of_guests,
    special_requests,
    menu_items,
  } = requestBody;

  const reservation_id = uuidv4();

  const reservation_datetime = new Date(
    `${reservation_date}T${reservation_time}`
  ).toISOString();

  const reservationDate = new Date(reservation_datetime);
  const bookingExpirationTime = new Date(reservationDate);
  bookingExpirationTime.setHours(reservationDate.getHours() - 1);

  const reservationsCollection = firestore.collection("reservations");
  const reservationData = {
    reservation_id,
    customer_id,
    restaurant_id,
    reservation_date,
    reservation_time,
    table_number,
    number_of_guests,
    special_requests,
    menu_items,
    booking_time: new Date().toISOString(),
    booking_expiration_time: bookingExpirationTime.toISOString(),
  };

  try {
    await reservationsCollection.doc(reservation_id).set(reservationData);
    const createdReservation = reservationData;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Reservation created successfully",
        reservation: createdReservation,
      }),
    };
  } catch (error) {
    console.error("Failed to create reservation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create reservation" }),
    };
  }
};
