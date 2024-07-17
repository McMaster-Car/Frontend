import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    navigate('/product', { state: { product } });
  };

  return (
    <Box>
      <Typography gutterBottom variant="p" component="div" sx={{ my: 2 }}>
        {`${products?.length} products`}
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              sx={{ border: '2px solid #178582' }}
            >
              <CardActionArea onClick={() => handleCardClick(product)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.variation.picture}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {product.variation.retailPrice}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
