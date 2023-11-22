const axios = require('axios');

function generateManageLocationInformationResponse(actionType, newAddress) {
    const responseMessage = `The location information has been ${actionType} to ${newAddress}.`;
    
    console.log(actionType + " " + newAddress);
    
    if (actionType == 'View'){
        
    }
    
    else if (actionType == 'Update'){
    
        console.log("updating information");
    
        const payload = {
        email: 'saini7@dal.ca',
        address: newAddress,
        };
        
        
        // Make the API call to update the opening times
        console.log('Making API call to update opening times:', payload);
        return axios.post('https://wzdh0w0265.execute-api.us-east-1.amazonaws.com/prod/storeRestaurantDetails', payload)
        .then((response) => {
            console.log('API call response:', response.status, response.data);
        
            if (response.data === true) {
                // Opening times updated successfully
                const responseMessage = responseMessage;
                console.log('Location updated successfully:', responseMessage);
                return {
                    sessionState: {
                        dialogAction: {
                            type: 'Close',
                        },
                        intent: {
                            name: 'ManageLocationInformation',
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
            } else {
                // Opening times update failed
                console.log('Failed to update location. Response data:', response.data);
                return {
                    sessionState: {
                        dialogAction: {
                            type: 'Close',
                        },
                        intent: {
                            name: 'ManageLocationInformation',
                            state: 'Failed',
                        },
                    },
                    messages: [
                        {
                            contentType: 'PlainText',
                            content: 'Failed to update opening hours. Please try again.',
                        },
                    ],
                };
            }
        })
        .catch((error) => {
            // Handle API call error
            console.error('Error calling API:', error.message);
            return {
                sessionState: {
                    dialogAction: {
                        type: 'Close',
                    },
                    intent: {
                        name: 'ManageLocationInformation',
                        state: 'Failed',
                    },
                },
                messages: [
                    {
                        contentType: 'PlainText',
                        content: 'Failed to update location. Please try again later.',
                    },
                ],
            };
        });
    
    }
    
    return {
        sessionState: {
            dialogAction: {
                type: 'Close',
            },
            intent: {
                name: 'ManageLocationInformation',
                state: 'Fulfilled',
            },
        },
        messages: [
            {
                contentType: 'PlainText',
                content: "Please choose the proper action",
            },
        ],
    };
}

module.exports = async (event) => {
    const intentName = event.sessionState.intent.name;

    if (intentName === 'ManageLocationInformation') {
        const slots = event.sessionState.intent.slots;
        return generateManageLocationInformationResponse(slots.ActionType, slots.NewAddress);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};

// function generateManageLocationInformationResponse(actionType, newAddress) {
//     const responseMessage = `The location information has been ${actionType} to ${newAddress}.`;

//     return {
//         sessionState: {
//             dialogAction: {
//                 type: 'Close',
//             },
//             intent: {
//                 name: 'ManageLocationInformation',
//                 state: 'Fulfilled',
//             },
//         },
//         messages: [
//             {
//                 contentType: 'PlainText',
//                 content: responseMessage,
//             },
//         ],
//     };
// }

// module.exports = async (event) => {
//     const intentName = event.sessionState.intent.name;

//     if (intentName === 'ManageLocationInformation') {
//         const slots = event.sessionState.intent.slots;
//         return generateManageLocationInformationResponse(slots.ActionType, slots.NewAddress);
//     }

//     return {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };