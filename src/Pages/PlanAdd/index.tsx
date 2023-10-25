// App.tsx
import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { productListApi } from "../../Api/plan";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
}

const ProductPlans: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = "/product/list";
        const response: any = await productListApi(url);
        const data = await response.json();
        console.log("data", data.productData);
        if (data) {
          const productData = data.productData.map((apiProduct: any) => ({
            id: apiProduct._id,
            name: apiProduct.productName,
            description: apiProduct.description, // Add description property if available
            price: apiProduct.price,
            imageSrc: apiProduct.imageUrl,
          }));
          setProducts(productData);
          console.log("products", products);
        } else {
          null;
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (id: string) => {
    // Implement edit functionality here
    console.log(`Edit button clicked for product with id ${id}`);
    // You can navigate to the edit page with the id, or show a modal for editing, etc.
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality here
    console.log(`Delete button clicked for product with id ${id}`);
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <>
      <Button
        sx={{  margin: " 10px auto", textAlign: "center", display: 'block' }}
        variant="contained"
      >
        <Link to={`/add-product/`} style={{color: 'white', textDecoration: 'none'}}>Add Plan</Link>
      </Button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} style={{ maxWidth: "100%" }}>
          {products.map((product) => (
            <Grid
              item
              xs={4}
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageSrc={product.imageSrc}
                onEdit={() => handleEdit(product.id)}
                onDelete={() => handleDelete(product.id)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default ProductPlans;
