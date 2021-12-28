import { AddShoppingCartOutlined } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className='card'>
      <CardMedia
        component='img'
        height='240'
        image={product.image}
        alt='green iguana'
      />
      <CardContent>
        <Typography color='textSecondary' variant='h5'>
          {product.name}
        </Typography>
        <Typography color='black' variant='h5'>
          ${product.cost}
        </Typography>
        <Rating defaultValue={product.rating} />
        <CardActions>
          <Button
            className='button'
            fullWidth
            variant='contained'
            onClick={handleAddToCart}
          >
            <AddShoppingCartOutlined />
            Add to cart
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
