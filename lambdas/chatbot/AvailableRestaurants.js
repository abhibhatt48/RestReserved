function generateAvailableRestaurantsResponse(address) {
    const responseMessage = "Here is your available restaurants list.";
    
    return {
        sessionState: {
            dialogAction: {
                type: 'Close',
            },
            intent: {
                name: 'AvailableRestaurants',
                state: 'Fulfilled', 
                slots: {
                    City: address,
                },
            },
        },
        messages: [
            {
                contentType: 'PlainText',
                content: responseMessage,
            },
        ],
    };
}

module.exports = async (event) => {
    const intentName = event.sessionState.intent.name;

    if (intentName === 'AvailableRestaurants') {
        const City = event.sessionState.intent.slots.City;
        return generateAvailableRestaurantsResponse(City);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
