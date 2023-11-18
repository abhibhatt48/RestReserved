function generateManageOpeningTimesResponse(actionType, openingTime, closingTime) {
    const responseMessage = `Opening hours have been ${actionType} to ${openingTime} - ${closingTime}.`;

    return {
        sessionState: {
            dialogAction: {
                type: 'Close',
            },
            intent: {
                name: 'ManageOpeningTimes',
                state: 'Fulfilled',
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

    if (intentName === 'ManageOpeningTimes') {
        const slots = event.sessionState.intent.slots;
        return generateManageOpeningTimesResponse(slots.ActionType, slots.OpeningTime, slots.ClosingTime);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};