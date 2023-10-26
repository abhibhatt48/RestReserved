import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetching restaurant data from the Lambda function
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://brene180q1.execute-api.us-east-1.amazonaws.com/dev/list-restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurants(); // Calling the fetchRestaurants function when the component mounts
  }, []); // Empty dependency array to make sure that this effect runs once after the initial render

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <div className="restaurant-card" key={restaurant.res_name}>
          <h2>{restaurant.res_name}</h2>
          <p>Location: {restaurant.res_location}</p>
          <p>Opening Time: {restaurant.res_opening_time}</p>
          <p>Closing Time: {restaurant.res_closing_time}</p>
          <button className="reservation-button">Make a Reservation</button>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
