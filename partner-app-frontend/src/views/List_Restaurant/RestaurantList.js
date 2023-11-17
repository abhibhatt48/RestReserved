import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditRestaurantForm from './EditRestaurntForm';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [editingRestaurant, setEditingRestaurant] = useState(null);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('https://kp63y524bjey432waococeq6w40wmjuf.lambda-url.us-east-1.on.aws/');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleEditClick = (restaurant) => {
        console.log(restaurant)
        setEditingRestaurant(restaurant);
    };

    return (
        <div>
            <h1>Restaurants List</h1>
            {restaurants.map(restaurant => (
                <div key={restaurant.restaurant_id}>
                    <h3>{restaurant.res_name}</h3>
                    <p>Opening Time: {restaurant.res_opening_time}</p>
                    <p>Closing Time: {restaurant.res_closing_time}</p>
                    <p>Address: {restaurant.res_address}</p>
                    <p>Total Tables: {restaurant.res_total_tables}</p>
                    {/* If the image URL is available, display the image */}
                    {restaurant.res_image_url && <img src={restaurant.res_image_url} alt={restaurant.res_name} />}
                    <button onClick={() => handleEditClick(restaurant)}>Edit</button>
                </div>
            ))}

            {editingRestaurant && (
                <EditRestaurantForm 
                    restaurant={editingRestaurant} 
                    onSave={() => {
                        setEditingRestaurant(null);
                        fetchRestaurants();
                    }} 
                />
            )}
        </div>
    );
};

export default RestaurantList;
