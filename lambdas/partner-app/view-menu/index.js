const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB();

exports.handler = async (event) => {
    try {
        const menuId = event.queryStringParameters.menu_id;
        console.log("menu_id",menuId);
        const params = {
            TableName: 'menu-table',
            Key: {
                MenuItemID: {
                    S: menuId
                }
            }
        };

        const result = await dynamoDB.getItem(params).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify('Menu not found'),
            };
        }

        const menuData = {
            menu_id: result.Item.MenuItemID.S,
            items: result.Item.Items.L.map(item => ({
                category: item.M.Category.L.map(category => category.S),
                description: item.M.Description.S,
                item_discount: item.M.ItemDiscount.BOOL,
                item_discount_rate: item.M.ItemDiscountRate.S,
                item_id: item.M.ItemID.S,
                item_image_url: item.M.ItemImageURL.S,
                item_name: item.M.ItemName.S
            })),
            menu_discount: result.Item.MenuDiscount.BOOL,
            menu_discount_rate: result.Item.MenuDiscountRate.S,
            res_id: result.Item.RestaurantID.S
        };

        return {
            statusCode: 200,
            body: JSON.stringify(menuData),
        };
    } catch (error) {
        console.error('Error fetching menu:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error fetching menu'),
        };
    }
};
