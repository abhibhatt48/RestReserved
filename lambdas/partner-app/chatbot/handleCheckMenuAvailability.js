const axios = require('axios');

function generateCheckMenuAvailabilityResponse(menuItem) {
    const responseMessage = `${menuItem.originalValue} is not available.`;
    
    if(menuItem.interpretedValue == "fullmenu"){
        
        return axios.get("https://8nqal5q4sf.execute-api.us-east-1.amazonaws.com/view-menu", 
        {
            params: {
                menu_id: "sushank7@abc.com_Tawa Grill_menu"
            }
        })
        .then(res => {
            
            console.log(res.data);
            const responseMessage = JSON.stringify(res.data);
                console.log('Menu', responseMessage);
                return {
                    sessionState: {
                        dialogAction: {
                            type: 'Close',
                        },
                        intent: {
                            name: 'CheckMenuAvailability',
                            state: 'Fulfilled',
                        },
                    },
                    messages: [
                        {
                            contentType: "ImageResponseCard",
                            content: "Full Menu?",
                            imageResponseCard: {
                                title: "Menu Item",
                                subtitle: "Select Menu",
                                buttons: res.data.items.slice(0, 4).map(item => (
                                    {
                                        text: item.item_name,
                                        // value: `${item.res_name}_${item.restaurant_id}`,
                                        value: item.item_name,
                                    }
                                )).filter(button => button.text),
                            },
                        },
                    ],
                };
        })
        .catch(err => {
            console.error('Error calling API:', err.message);
            return {
                sessionState: {
                    dialogAction: {
                        type: 'Close',
                    },
                    intent: {
                        name: 'CheckMenuAvailability',
                        state: 'Failed',
                    },
                },
                messages: [
                    {
                        contentType: 'PlainText',
                        content: 'Failed to fetch menu. Please try again later.',
                    },
                ],
            };
        });
    }
    
    else {
            
        return axios.get("https://8nqal5q4sf.execute-api.us-east-1.amazonaws.com/view-menu", 
        {
            params: {
                menu_id: "sushank7@abc.com_Tawa%20Grill_menu",
                menu_item_id: 5
            }
        })
        .then(res => {
            
            if(res.data == true){
                const responseMessage = `${menuItem.originalValue} is available`;
            }
            else{
                const responseMessage = `${menuItem.originalValue} is not available`;
            }
            
            return {
                    sessionState: {
                        dialogAction: {
                            type: 'Close',
                        },
                        intent: {
                            name: 'CheckMenuAvailability',
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
        })
        .catch(err => {
            console.error('Error calling API:', err.message);
            return {
                sessionState: {
                    dialogAction: {
                        type: 'Close',
                    },
                    intent: {
                        name: 'CheckMenuAvailability',
                        state: 'Failed',
                    },
                },
                messages: [
                    {
                        contentType: 'PlainText',
                        content: 'Failed to fetch menu. Please try again later.',
                    },
                ],
            };
        });
    }

    // return {
    //     sessionState: {
    //         dialogAction: {
    //             type: 'Close',
    //         },
    //         intent: {
    //             name: 'CheckMenuAvailability',
    //             state: 'Fulfilled',
    //         },
    //     },
    //     messages: [
    //         {
    //             contentType: 'PlainText',
    //             content: responseMessage,
    //         },
    //     ],
    // };
}

module.exports = async (event) => {
    const intentName = event.sessionState.intent.name;

    if (intentName === 'CheckMenuAvailability') {
        const menuItem = event.sessionState.intent.slots.MenuItem.value;
        return generateCheckMenuAvailabilityResponse(menuItem);
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};

// function generateCheckMenuAvailabilityResponse(menuItem) {
//     const responseMessage = `${menuItem} is available/not available.`;

//     return {
//         sessionState: {
//             dialogAction: {
//                 type: 'Close',
//             },
//             intent: {
//                 name: 'CheckMenuAvailability',
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

//     if (intentName === 'CheckMenuAvailability') {
//         const menuItem = event.sessionState.intent.slots.MenuItem;
//         return generateCheckMenuAvailabilityResponse(menuItem);
//     }

//     return {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };