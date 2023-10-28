import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { UpdatePlanApi, productListApi } from '../../Api/plan';

interface Product {
  id: string;
  name: string;
  description: string;
  mrp: string;
  price: string;
  imageSrc: string;
}

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [planId, setPlanId] = useState('');

  const getMode = () => {
    const path = window.location.href;
    const pathArray = path.split('/');
    if (pathArray[pathArray.length - 2] === 'edit-product') {
      const PlanId = pathArray[pathArray.length - 1];
      setPlanId(PlanId);
      console.log('planId', planId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/product/id?id=${planId}`;
        const response: any = await productListApi(url);
        const data = await response.json();
        console.log('data', data.productData);
        if (data) {
          const productData = data.productData.map((apiProduct: any) => ({
            id: apiProduct._id,
            name: apiProduct.productName,
            description: apiProduct.description,
            price: apiProduct.price,
            mrp: apiProduct.mrp,
            imageSrc: apiProduct.imageUrl,
          }));
          setProducts(productData);
          console.log('products', products);
        } else {
          console.log('No data received');
        }
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
    getMode();
  }, [id, planId]);

  const handleUpdate = async () => {
    // Make an API call to update the card data
    try {
      const url = "/user/update";
      await UpdatePlanApi(url, products);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: '0 20px',
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
      }}
    >
      <img
        src={products[0]?.imageSrc} // Assuming you're showing the image for the first product
        alt={products[0]?.name}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <CardContent>
        <TextField
          label="Name"
          value={products[0]?.name}
          onChange={(e) => setProducts([{ ...products[0], name: e.target.value }])}
          fullWidth
        />
        <TextField
          label="Max Retail Price (MRP)"
          placeholder="MRP"
          fullWidth
          type="number"
          style={{ width: '100%', marginTop: '20px' }}
          name="mrp"
          value={products[0]?.mrp}
          onChange={(e) => setProducts([{ ...products[0], mrp: e.target.value }])}
        />
        <TextField
          label="Price"
          placeholder="price"
          fullWidth
          type="number"
          style={{ width: '100%', marginTop: '20px' }}
          name="price"
          value={products[0]?.price}
          onChange={(e) => setProducts([{ ...products[0], price: e.target.value }])}
        />
        <TextareaAutosize
          placeholder="Description"
          value={products[0]?.description}
          onChange={(e) => setProducts([{ ...products[0], description: e.target.value }])}
          style={{ width: '100%', marginTop: '20px' }}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditPage;
