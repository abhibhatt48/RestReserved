function generateGetMenuResponse(menu) {
    const responseMessage = "Here is your menu.";
    
    return {
        sessionState: {
            dialogAction: {
                type: 'Close',
            },
            intent: {
                name: 'GetMenu',
                state: 'Fulfilled', 
                slots: {
                    menu: menu,
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

    if (intentName === 'GetMenu') {
        const menu = event.sessionState.intent.slots.menu;
        return generateGetMenuResponse(menu);
    }
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
