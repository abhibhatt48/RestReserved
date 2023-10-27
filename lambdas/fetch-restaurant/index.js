const axios = require('axios');

exports.handler = async (event) => {
    try {
        // Fetch the list of restaurants from the external API
        const response = await axios.get('https://brene180q1.execute-api.us-east-1.amazonaws.com/dev/list-restaurants');
        const restaurants = response.data;

        // Get the restaurant ID from the event
        const restaurantId = event.restaurantId;

        // Find the restaurant object with the specified restaurant ID
        const restaurant = restaurants.find((r) => r.restaurant_id === restaurantId);

        if (restaurant) {
            return {
                statusCode: 200,
                body: JSON.stringify(restaurant),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Restaurant not found' }),
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
