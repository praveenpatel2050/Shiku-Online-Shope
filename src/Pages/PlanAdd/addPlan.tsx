import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { addPlanApi } from "../../Api/plan";

const AddPlan: React.FC = () => {
  const [formData, setFormData] = useState({
    image: null,
    productName: "",
    mrp: "",
    price: "",
    status: "true",
    // productDetails: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleAddPlan = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const form = new FormData();
  
    // Check if an image is selected before appending it
    if (formData.image) {
      form.append("image", formData.image);
    }
  
    form.append("productName", formData.productName);
    form.append("mrp", formData.mrp);
    form.append("price", formData.price);
    form.append("status", formData.status)
    try {
      const url = "/product/add";
      await addPlanApi(url, form);
      // Handle the response from the API
    } catch (error) {
      console.error("Error", error);
    }
  };
  
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "0 20px",
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <CardContent>
        <form
        encType="multipart/form-data"
        >
        <TextField
          type="file"
          fullWidth
          name="image"
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          label="Name"
          fullWidth 
          style={{ width: "100%", marginTop: "20px" }}
          name="productName"
          value={formData.productName}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          label="Max Retail Price (MRP)"
          placeholder="MRP"
          fullWidth
          type="number"
          style={{ width: "100%", marginTop: "20px" }}
          name="mrp"
          value={formData.mrp}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          label="Price"
          placeholder="price"
          fullWidth
          type="number"
          style={{ width: "100%", marginTop: "20px" }}
          name="price"
          value={formData.price}
          onChange={(e) => handleInputChange(e)}
        />
        </form>
        {/* <TextareaAutosize
  placeholder="Product Details..."
  style={{ width: "100%", marginTop: "20px", height: "50px" }}
  name="productDetails"
  value={formData.productDetails}
  onChange={(e) => handleInputChange(e)}
/> */}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "auto" }}
          onClick={handleAddPlan}
        >
          Add Plan
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddPlan;
