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
import Cart from './Cart';

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
  let debounceTimeout = 0;
  let products = [];
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [productFound, setProductFound] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const debounceSearch = (value) => {
    // const value = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      performSearch(value);
    }, 500);
  };

  const performSearch = async (text) => {
    try {
      let res = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      console.log(res.data);
      setFilteredProducts(res.data.slice());
      setProductFound(true);
    } catch (error) {
      console.log('wrong data search');
      setProductFound(false);
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      setProductFound(true);
      let response = await axios.get(`${config.endpoint}/products`);
      setLoading(false);
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

  const fetchCart = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      let response = await axios.get(`${config.endpoint}/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response);
      // products = response.data;
      // console.log(products.slice());
      // setFilteredProducts(products.slice());
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        console.log(error.response.data.message);
        enqueueSnackbar(
          error.response.data.message || 'No Products in cart Found',
          { variant: 'error' }
        );
      } else {
        enqueueSnackbar(
          'Could not update cart. Check that the backend is running, reachable and returns valid JSON.',
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
      <Header search={debounceSearch}></Header>

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
        onChange={(e) => debounceSearch(e.target.value)}
        name='search'
      />
      {localStorage.getItem('username') ? (
        <div>
          <Grid container>
            <Grid item xs={12} sm={9}>
              <Grid container>
                <Grid item className='product-grid'>
                  <Box className='hero'>
                    <p className='hero-heading'>
                      India’s{' '}
                      <span className='hero-highlight'>FASTEST DELIVERY</span>{' '}
                      to your door step
                    </p>
                  </Box>
                </Grid>
              </Grid>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '150px' }}>
                  <CircularProgress />
                  <p>Loading Products...</p>
                </div>
              ) : productFound ? (
                <Grid
                  container
                  spacing={{ xs: 2, md: 4 }}
                  columns={{ xs: 4, sm: 8, md: 16 }}
                  style={{ marginTop: '0.5px', marginBottom: '20px' }}
                >
                  {filteredProducts.map((product) => (
                    <Grid item xs={2} sm={4} md={4} key={product._id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <div style={{ textAlign: 'center', padding: '150px' }}>
                  <SentimentDissatisfied />
                  <p>No products found</p>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={3} className='cartClass'>
              <Cart />
            </Grid>
          </Grid>
        </div>
      ) : (
        <>
          <Grid container>
            <Grid item className='product-grid'>
              <Box className='hero'>
                <p className='hero-heading'>
                  India’s{' '}
                  <span className='hero-highlight'>FASTEST DELIVERY</span> to
                  your door step
                </p>
              </Box>
            </Grid>
          </Grid>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '150px' }}>
              <CircularProgress />
              <p>Loading Products...</p>
            </div>
          ) : productFound ? (
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 4, sm: 8, md: 16 }}
              style={{ marginTop: '0.5px', marginBottom: '20px' }}
            >
              {filteredProducts.map((product) => (
                <Grid item xs={2} sm={4} md={4} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div style={{ textAlign: 'center', padding: '150px' }}>
              <SentimentDissatisfied />
              <p>No products found</p>
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Products;
