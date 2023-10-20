const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);

    const {
        reservation_id,
        updated_reservation_date,
        updated_reservation_time,
        updated_number_of_guests,
        updated_special_requests,
    } = requestBody;
    console.log("reservation-id",reservation_id);
    try {
        const updatedReservation = await updateAndSaveReservation(reservation_id, {
            reservation_date: updated_reservation_date,
            reservation_time: updated_reservation_time,
            number_of_guests: updated_number_of_guests,
            special_requests: updated_special_requests,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Reservation updated successfully', updatedReservation }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
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
        return null; // Return null or an appropriate indicator
    }
}

// Function to update and save a reservation
async function updateAndSaveReservation(reservationId, updatedData) {
    const existingReservation = await getReservationById(reservationId);

    if (!existingReservation) {
        throw new Error('Reservation not found');
    }

    // Update individual properties based on updatedData
    if (updatedData.reservation_date) {
        existingReservation.reservation_date = updatedData.reservation_date;
    }
    if (updatedData.reservation_time) {
        existingReservation.reservation_time = updatedData.reservation_time;
    }
    if (updatedData.number_of_guests) {
        existingReservation.number_of_guests = updatedData.number_of_guests;
    }
    if (updatedData.special_requests) {
        existingReservation.special_requests = updatedData.special_requests;
    }

    const updateParams = {
        TableName: 'restaurant_reservation', // Replace with your table name
        Key: { reservation_id: reservationId },
        UpdateExpression: 'SET reservation_date = :rd, reservation_time = :rt, number_of_guests = :ng, special_requests = :sr',
        ExpressionAttributeValues: {
            ':rd': existingReservation.reservation_date,
            ':rt': existingReservation.reservation_time,
            ':ng': existingReservation.number_of_guests,
            ':sr': existingReservation.special_requests,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamodb.update(updateParams).promise();
        return result.Attributes;
    } catch (error) {
        throw  Error('Failed to update and save reservation');
    }
}

