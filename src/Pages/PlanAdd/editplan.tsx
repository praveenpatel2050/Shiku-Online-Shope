import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cardData, setCardData] = useState({ id: id, name: '', description: '', imageSrc: '' });

  useEffect(() => {
    // Fetch additional card data using the `id`
    fetch(`your_api_endpoint/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCardData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleUpdate = () => {
    // Make an API call to update the card data
    fetch(`your_api_endpoint/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cardData), // Update with the modified card data
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful update
        } else {
          // Handle errors
        }
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
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
    //    src={cardData.imageSrc} 
       src="https://images.samsung.com/is/image/samsung/p6pim/in/2108/gallery/in-galaxy-watch4-398879-sm-r870nzkainu-481111391?$1300_1038_PNG$"
       alt={cardData.name} style={{ maxWidth: '100%', height: 'auto' }} />
      <CardContent>
        <TextField
          label="Name"
          value={cardData.name}
          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
          fullWidth
        />
        <TextareaAutosize
        //   rowsMin={3}
          placeholder="Description"
          value={cardData.description}
          onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
          style={{ width: '100%', marginTop: '20px', }}
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
