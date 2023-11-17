const AWS = require('aws-sdk');
AWS.config.update({ region: 'Write aws region here' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'table_reservation_app_restaurants';

exports.handler = async (event, context) => {
    const params = {
        TableName: tableName
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        console.error('Error fetching data from DynamoDB:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch data' })
        };
    }
};

