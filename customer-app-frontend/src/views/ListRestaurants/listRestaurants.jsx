import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate(); // Get the navigation function

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://brene180q1.execute-api.us-east-1.amazonaws.com/dev/list-restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleReservationClick = (restaurant) => {
    // Navigate to the '/book' route and pass the 'restaurant' object as state
    console.log(restaurant);
    navigate('/book', { state: { restaurant } });
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {restaurants.map((restaurant, index) => (
        <Grid item key={index}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                {restaurant.res_name}
              </Typography>
              <Typography color="text.secondary">{restaurant.res_location}</Typography>
              <Typography color="text.secondary">
                Opening Time: {restaurant.res_opening_time} - Closing Time: {restaurant.res_closing_time}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleReservationClick(restaurant)}>
                Make a Reservation
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RestaurantList;
