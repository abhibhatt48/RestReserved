const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB();

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const menuItemID = JSON.parse(event.body).MenuItemID;
    console.log("menuItemId",menuItemID);
    // Validate input
    if (!menuItemID || typeof menuItemID !== 'string') {
        console.log('Invalid or missing MenuItemID:', menuItemID);
        return {
            statusCode: 400,
            body: JSON.stringify('Invalid or missing MenuItemID'),
        };
    }
    const params = {
        TableName: 'menu-table', 
        Key: {
            MenuItemID: {
                S: menuItemID
            }
        }
    };

    try {
        await dynamoDB.deleteItem(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify('Item deleted successfully'),
        };
    } catch (error) {
        console.error('Error deleting item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error deleting item'),
        };
    }
};
