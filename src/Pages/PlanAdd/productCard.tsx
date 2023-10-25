// Card.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface CardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<CardProps> = ({ id, name, description, price, imageSrc, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <img src={imageSrc} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/edit-product/${id}`} >Edit</Link> {/* Link to the edit page */}
        </Button>
        <Button size="small" onClick={onDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
