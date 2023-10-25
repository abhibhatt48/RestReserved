import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function MenuSelector() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl =
      "https://xt9806b6e1.execute-api.us-east-1.amazonaws.com/default/getMenuItems?restaurantId=12";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleAdd = (menuItem) => {
    // Handle adding to cart or updating quantity
  };

  const handleRemove = (menuItem) => {
    // Handle removing from cart or updating quantity
  };

  return (
    <Container>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Grid container spacing={2}>
          {restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.MenuItemID}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    Restaurant ID: {restaurant.RestaurantID}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {restaurant.Items.map((menuItem) => (
                      <Card
                        style={{ display: "flex", width: 300, margin: "8px" }}
                        key={menuItem.ItemID}
                      >
                        <CardMedia
                          component="img"
                          alt={menuItem.ItemName}
                          height="140"
                          image={menuItem.ImageUrl}
                        />
                        <div style={{ flex: 1 }}>
                          <CardContent>
                            <Typography variant="h6">
                              {menuItem.ItemName}
                            </Typography>
                            <Typography>{menuItem.Description}</Typography>
                            <Typography>
                              Price: ${parseFloat(menuItem.Price).toFixed(2)}
                            </Typography>
                            <Typography>
                              Category: {menuItem.Category.join(", ")}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <IconButton
                                onClick={() => handleRemove(menuItem)}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography variant="h6">0</Typography>{" "}
                              {/* Display quantity here */}
                              <IconButton onClick={() => handleAdd(menuItem)}>
                                <AddIcon />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MenuSelector;
