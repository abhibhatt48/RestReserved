const AWS = require('aws-sdk');
const uuid = require('uuid'); // To generate a unique Reservation ID
const dynamodb = new AWS.DynamoDB.DocumentClient; // Replace 'your-region' with the AWS region

exports.handler = async (event) => {
    // Parse the incoming request body as JSON
    const requestBody = JSON.parse(event.body);

    // Extract data from the request body
    const {
        customer_id,
        restaurant_id,
        reservation_date, 
        reservation_time, 
        number_of_guests,
        special_requests,
    } = requestBody;

    // Generate a unique Reservation ID
    const reservation_id = uuid.v4();

    // Combine the date and time into a single ISO 8601 timestamp
    const reservation_datetime = new Date(`${reservation_date}T${reservation_time}`).toISOString();

    // Calculate the Booking Expiration Time (1 hour before the reservation time)
    const reservationDate = new Date(reservation_datetime);
    const bookingExpirationTime = new Date(reservationDate);
    bookingExpirationTime.setHours(reservationDate.getHours() - 1);

    // Prepare the item to be inserted into DynamoDB
    const params = {
        TableName: 'restaurant_reservation', // Replace with your DynamoDB table name
        Item: {
            reservation_id,
            customer_id,
            restaurant_id,
            reservation_date,
            reservation_time,
            number_of_guests,
            special_requests,
            booking_time: new Date().toISOString(),
            booking_expiration_time: bookingExpirationTime.toISOString(),
        },
    };
    try {
        // Put the reservation item into DynamoDB
        await dynamodb.put(params).promise();

        // Return the created reservation data
        const createdReservation = {
            reservation_id,
            customer_id,
            restaurant_id,
            reservation_date,
            reservation_time,
            number_of_guests,
            special_requests,
            booking_time: params.Item.booking_time,
            booking_expiration_time: params.Item.booking_expiration_time,
        };

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Reservation created successfully', reservation: createdReservation }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to create reservation' }),
        };
    }
};
