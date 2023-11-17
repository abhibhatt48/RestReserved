const AWS = require('aws-sdk');
AWS.config.update({ region: 'your-region' }); // Replace 'your-region' with your DynamoDB region
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'table_reservation_app_restaurants';

exports.handler = async (event, context) => {
    const { restaurant_id } = event;
    const updateParams = {
        TableName: tableName,
        Key: { 'restaurant_id': restaurant_id },
        UpdateExpression: 'set ',
        ExpressionAttributeValues: {},
        ReturnValues: 'UPDATED_NEW'
    };

    let hasUpdates = false;
    for (const key of ['name', 'closing_time', 'opening_time', 'address', 'total_tables', 'image_base64']) {
        if (event[key]) {
            hasUpdates = true;
            updateParams.UpdateExpression += `${key} = :${key}, `;
            updateParams.ExpressionAttributeValues[`:${key}`] = event[key];
        }
    }

    if (!hasUpdates) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No update fields provided' })
        };
    }

    updateParams.UpdateExpression = updateParams.UpdateExpression.slice(0, -2);

    try {
        await dynamoDb.update(updateParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item updated successfully' })
        };
    } catch (error) {
        console.error('Error updating item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update item' })
        };
    }
};
