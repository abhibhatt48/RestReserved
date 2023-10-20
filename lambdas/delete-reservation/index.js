const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);

    const { reservation_id } = requestBody;

    try {
        // Check if the reservation exists before deleting
        const existingReservation = await getReservationById(reservation_id);

        if (!existingReservation) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Reservation not found' }),
            };
        }

        // Delete the reservation
        await deleteReservation(reservation_id);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Reservation deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to delete reservation' }),
        };
    }
};

// Function to get a reservation by ID
async function getReservationById(reservationId) {
    try {
        const params = {
            TableName: 'restaurant_reservation',
            Key: {
                reservation_id: reservationId,
            },
        };

        const existingReservation = await dynamodb.get(params).promise();

        if (!existingReservation.Item) {
            return null; // Reservation not found
        }

        return existingReservation.Item;
    } catch (error) {
        console.error('Error getting reservation by ID:', error);
        return null;
    }
}

// Function to delete a reservation
async function deleteReservation(reservationId) {
    try {
        const params = {
            TableName: 'restaurant_reservation',
            Key: {
                reservation_id: reservationId,
            },
        };

        await dynamodb.delete(params).promise();
    } catch (error) {
        console.error('Error deleting reservation:', error);
        throw new Error('Failed to delete reservation');
    }
}
