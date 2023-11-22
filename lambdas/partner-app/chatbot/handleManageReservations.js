const axios = require('axios');

function generateManageReservationsResponse(actionType, reservationId) {
    
    const id = reservationId.interpretedValue;
    
    actionType = actionType.interpretedValue;
    
    if(actionType == "approve"){
        const payload = {
            reservation_id: id,
            status: 'Y',
        };
    
    
        // Make the API call to update the opening times
        return axios.post('https://vdvua9bvw8.execute-api.us-east-1.amazonaws.com/prod/edit-reservation', payload)
            .then((response) => {
                console.log('API call response:', response.status, response.data);
    
                if (response.status == 200) {
                    // Opening times updated successfully
                    const responseMessage = `Reservation with id ${id} successfully approved.`;
                    return {
                        sessionState: {
                            dialogAction: {
                                type: 'Close',
                            },
                            intent: {
                                name: 'ManageReservations',
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
                    return {
                        sessionState: {
                            dialogAction: {
                                type: 'Close',
                            },
                            intent: {
                                name: 'ManageReservations',
                                state: 'Failed',
                            },
                        },
                        messages: [
                            {
                                contentType: 'PlainText',
                                content: 'Failed to approve the reservation.',
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
                            name: 'ManageReservations',
                            state: 'Failed',
                        },
                    },
                    messages: [
                        {
                            contentType: 'PlainText',
                            content: 'Failed to approve reservation. Please try again later.',
                        },
                    ],
                };
            });
    }
    else if(actionType == "reject"){
        const payload = {
            reservation_id: id,
            status: 'N',
        };
    
    
        // Make the API call to update the opening times
        console.log('Making API call to update opening times:', payload);
        return axios.post('https://vdvua9bvw8.execute-api.us-east-1.amazonaws.com/prod/edit-reservation', payload)
            .then((response) => {
                console.log('API call response:', response.status, response.data);
    
                if (response.status == 200) {
                    // Opening times updated successfully
                    const responseMessage = `Reservation with id: ${id} rejected successfully`;
                    return {
                        sessionState: {
                            dialogAction: {
                                type: 'Close',
                            },
                            intent: {
                                name: 'ManageReservations',
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
                    return {
                        sessionState: {
                            dialogAction: {
                                type: 'Close',
                            },
                            intent: {
                                name: 'ManageReservations',
                                state: 'Failed',
                            },
                        },
                        messages: [
                            {
                                contentType: 'PlainText',
                                content: 'Failed to reject reservation. Please try again.',
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
                            name: 'ManageReservations',
                            state: 'Failed',
                        },
                    },
                    messages: [
                        {
                            contentType: 'PlainText',
                            content: 'Failed to reject reservation. Please try again later.',
                        },
                    ],
                };
            });
    }
    else if(actionType == "delete"){
        const payload = {
            reservation_id: id
        };
    
    
        // Make the API call to update the opening times
        console.log('Making API call to update opening times:', payload);
        return axios.post('https://vdvua9bvw8.execute-api.us-east-1.amazonaws.com/prod/delete-reservation', payload)
            .then((response) => {
                console.log('API call response:', response.status, response.data);
    
                if (response.status == 200) {
                    // Opening times updated successfully
                    const responseMessage = `Reservation with id: ${id} deleted successfully`;
                    return {
                        sessionState: {
                            dialogAction: {
                                type: 'Close',
                            },
                            intent: {
                                name: 'ManageReservations',
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
                    return {
                        sessionState: {
                            dialogAction: {
                                type: 'Close',
                            },
                            intent: {
                                name: 'ManageReservations',
                                state: 'Failed',
                            },
                        },
                        messages: [
                            {
                                contentType: 'PlainText',
                                content: 'Failed to delete reservation. Please try again.',
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
                            name: 'ManageReservations',
                            state: 'Failed',
                        },
                    },
                    messages: [
                        {
                            contentType: 'PlainText',
                            content: 'Failed to delete reservation. Please try again later.',
                        },
                    ],
                };
            });
    }
    else if(actionType == "edit"){
        const payload = {
            reservation_id: id,
            status: 'N',
        };
    
    
        // Make the API call to update the opening times
        return axios.post('https://vdvua9bvw8.execute-api.us-east-1.amazonaws.com/prod/edit-reservation', payload)
            .then((response) => {
                console.log('API call response:', response.status, response.data);
    
                if (response.status == 200) {
                    // Opening times updated successfully
                    const responseMessage = `Reservation with id: ${id} edited successfully`;
                    return {
                        sessionState: {
                            dialogAction: {
                                type: 'Close',
                            },
                            intent: {
                                name: 'ManageReservations',
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
                    return {
                        sessionState: {
                            dialogAction: {
                                type: 'Close',
                            },
                            intent: {
                                name: 'ManageReservations',
                                state: 'Failed',
                            },
                        },
                        messages: [
                            {
                                contentType: 'PlainText',
                                content: 'Failed to edit reservation. Please try again.',
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
                            name: 'ManageReservations',
                            state: 'Failed',
                        },
                    },
                    messages: [
                        {
                            contentType: 'PlainText',
                            content: 'Failed to edit reservation. Please try again later.',
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
                name: 'ManageReservations',
                state: 'Elicit',
            },
        },
        messages: [
            {
                contentType: 'PlainText',
                content: "Please choose valid action",
            },
        ],
    };
}

module.exports = async (event) => {
    const intentName = event.sessionState.intent.name;

    if (intentName === 'ManageReservations') {
        const slots = event.sessionState.intent.slots;
        return generateManageReservationsResponse(slots.ActionType.value, slots.ReservationId.value);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};


// function generateManageReservationsResponse(actionType, reservationDetails) {
//     const responseMessage = `The reservation for ${reservationDetails} has been ${actionType}.`;

//     return {
//         sessionState: {
//             dialogAction: {
//                 type: 'Close',
//             },
//             intent: {
//                 name: 'ManageReservations',
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

//     if (intentName === 'ManageReservations') {
//         const slots = event.sessionState.intent.slots;
//         return generateManageReservationsResponse(slots.ActionType, slots.ReservationDetails);
//     }

//     return {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };