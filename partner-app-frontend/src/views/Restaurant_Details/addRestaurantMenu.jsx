import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AddMenuItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    res_image_base64: null
  });

  let locate=useLocation();
  let navigate = useNavigate();
  let email="";
  let res_name="";
  if (locate.state && locate.state.email && locate.state.res_name) 
  {
    email = locate.state.email;
    res_name=locate.state.res_name;
  }
  else{
    console.log("Email not found in location state.",email)
    console.log("Restaurant name not found in location state.",res_name)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      //Converting image to base64 string
      reader.readAsDataURL(file);
      //Extracting base64 string of the image
      reader.onloadend = () => {
        setFormData({ ...formData, res_image_base64: reader.result.split(',')[1] });
      };
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Validate category to ensure it is comma-separated
    const categoryArray = formData.category.split(',').map((cat) => cat.trim());
    if (categoryArray.length > 1) {
      // Continue with form submission
      console.log('Valid categories:', categoryArray);
      // Add your logic to handle the form data submission
    } else {
      // Display an error message for invalid category input
      console.error('Invalid category input. Please provide comma-separated values.');
    }
  };

  const handleAddAnotherItem = () => {
    // Reset the form for another item
    setFormData({
      itemName: '',
      description: '',
      category: '',
      res_image_base64: null,
    });
  };

  const handleDone = () => {
    alert("Restaurant details submitted successfully!");
    navigate("/signin");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Add Menu Items
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Item Name"
              name="itemName"
              fullWidth
              value={formData.itemName}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category (separate multiple values with comma like vegan, dairy-free etc.)"
              name="category"
              fullWidth
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="image-upload">Upload Item Image*</InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="image-upload"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleFormSubmit}>
              Submit Item
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleAddAnotherItem}>
              Add Another Item
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleDone}>
              Done
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddMenuItemForm;
