function generateBookRestaurantResponse(restaurant, guests) {
    const responseMessage = "Thanks for booking!!!";

    const isBookingSuccessful = true; 

    if (isBookingSuccessful) {
        const successMessage = "Your booking is complete now.";
        return {
            sessionState: {
                dialogAction: {
                    type: 'Close',
                },
                intent: {
                    name: 'BookRestaurant',
                    state: 'Fulfilled', 
                    slots: {
                        restaurant: restaurant,
                        guests: guests,
                    },
                },
            },
            messages: [
                {
                    contentType: 'PlainText',
                    content: successMessage,
                },
            ],
        };
    } else {
        const failureMessage = "Something went wrong!!!";
        return {
            sessionState: {
                dialogAction: {
                    type: 'Close',
                },
                intent: {
                    name: 'BookRestaurant',
                    state: 'Failed', 
                    slots: {
                        restaurant: restaurant,
                        guests: guests,
                    },
                },
            },
            messages: [
                {
                    contentType: 'PlainText',
                    content: failureMessage,
                },
            ],
        };
    }
}

module.exports = async (event) => {
    const intentName = event.sessionState.intent.name;

    if (intentName === 'BookRestaurant') {
        const restaurant = event.sessionState.intent.slots.restaurant;
        const guests = event.sessionState.intent.slots.guests;
        return generateBookRestaurantResponse(restaurant, guests);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
