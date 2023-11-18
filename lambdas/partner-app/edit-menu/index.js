const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);

        const { menu_id, items, menu_discount, menu_discount_rate, res_id } = requestBody;

        
        const mappedItems = items.map(item => ({
            Category: item.category,
            Description: item.description,
            ItemDiscount: item.item_discount,
            ItemDiscountRate: item.item_discount_rate,
            ItemID: item.item_id,
            ItemImageURL: item.item_image_url,
            ItemName: item.item_name,
        }));

        const params = {
            TableName: 'menu-table',
            Key: {
                MenuItemID: menu_id,
            },
            UpdateExpression: 'SET #items = :items, #menu_discount = :menu_discount, #menu_discount_rate = :menu_discount_rate, #res_id = :res_id',
            ExpressionAttributeNames: {
                '#items': 'Items',
                '#menu_discount': 'MenuDiscount',
                '#menu_discount_rate': 'MenuDiscountRate',
                '#res_id': 'RestaurantID',
            },
            ExpressionAttributeValues: {
                ':items': mappedItems,
                ':menu_discount': menu_discount,
                ':menu_discount_rate': menu_discount_rate,
                ':res_id': res_id,
            },
            ReturnValues: 'ALL_NEW', 
        };

        await dynamoDB.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify('Menu item updated successfully'),
        };
    } catch (error) {
        console.error('Error updating menu item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error updating menu item'),
        };
    }
};
