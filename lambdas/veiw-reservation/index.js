const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const reservationId = requestBody.reservation_id;

        const reservation = await getReservationById(reservationId);

        if (!reservation) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Reservation not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Reservation found', reservation }),
        };
    } catch (error) {
        console.error('Error in Lambda handler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to retrieve reservation' }),
        };
    }
};

// Function to get a reservation by ID
async function getReservationById(reservationId) {
    try {
        const params = {
            TableName: 'restaurant_reservation', // Replace with your table name
            Key: {
                reservation_id: reservationId,
            },
        };

        console.log('Getting reservation by ID:', reservationId);
        const existingReservation = await dynamodb.get(params).promise();
        
        if (!existingReservation.Item) {
            console.log('Reservation not found.');
            return null; // Reservation not found
        }

        return existingReservation.Item;
    } catch (error) {
        console.error('Error getting reservation by ID:', error);
        return null;
    }
}
