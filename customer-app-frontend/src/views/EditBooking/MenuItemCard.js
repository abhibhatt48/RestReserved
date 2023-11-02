import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function MenuItemCard({ item, onItemSelect }) {
  const [quantity, setQuantity] = useState(0);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onItemSelect({
      item_id: item.ItemID,
      item_name: item.ItemName,
      quantity: quantity + 1,
    });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onItemSelect({
        item_id: item.ItemID,
        item_name: item.ItemName,
        quantity: quantity - 1,
      });
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt={item.ItemName}
        height="140"
        image={item.ImageUrl}
      />
      <CardContent>
        <Typography variant="h6">{item.ItemName}</Typography>
        <Typography variant="body2">{item.Description}</Typography>
        <Typography variant="h6">${item.Price}</Typography>
        <div>
          <IconButton onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          {quantity}
          <IconButton onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
