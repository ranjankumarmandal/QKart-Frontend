import { Search, SentimentDissatisfied } from '@mui/icons-material';
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { config } from '../App';
import Footer from './Footer';
import Header from './Header';
import './Products.css';
import ProductCard from './ProductCard';

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const product = {
    name: 'Tan Leatherette Weekender Duffle',
    category: 'Fashion',
    cost: 150,
    rating: 4,
    image:
      'https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png',
    _id: 'PmInA797xJhMIPti',
  };

  const cartRef = React.createRef();
  const debounceTimeout = 0;
  let products = [];
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const debounceSearch = (event) => {
    const value = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const performSearch = async (text) => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toUpperCase().includes(text.toUpperCase()) ||
          product.category.toUpperCase().includes(text.toUpperCase())
      )
    );
  };

  const getProducts = async () => {
    try {
      let response = await axios.get(`${config.endpoint}/products`);
      enqueueSnackbar('Welcome to QKart - By Ranjan Kumar Mandal', {
        variant: 'success',
      });
      console.log(response);
      products = response.data;
      console.log(products.slice());
      setFilteredProducts(products.slice());
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        console.log(error.response.data.message);
        enqueueSnackbar(error.response.data.message || 'No Products Found', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(
          'Could not fetch products. Check that the backend is running, reachable and returns valid JSON.',
          { variant: 'error' }
        );
      }
    }
  };

  useEffect(() => {
    getProducts();

    if (localStorage.getItem('email') && localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className='search-mobile'
        size='small'
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Search color='primary' />
            </InputAdornment>
          ),
        }}
        placeholder='Search for items/categories'
        name='search'
      />
      <Grid container>
        <Grid item className='product-grid'>
          <Box className='hero'>
            <p className='hero-heading'>
              India’s <span className='hero-highlight'>FASTEST DELIVERY</span>{' '}
              to your door step
            </p>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {filteredProducts.map((product) => (
          <Grid item xs={2} sm={4} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {/* <ProductCard product={product}/> */}
      <Footer />
    </div>
  );
};

export default Products;
