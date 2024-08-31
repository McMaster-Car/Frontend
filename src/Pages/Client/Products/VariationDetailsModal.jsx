import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@mui/material';

const VariationDetailsPage = () => {
    const location = useLocation();

    const { variation } = location.state || {};

    if (!variation) return <div>No variation data available.</div>;

    const {
        picture, retailPrice,
        addToCart, ...restOfVariation
    } = variation;


    return (
        <Box
            sx={{
                position: 'relative',
                width: '90%',
                margin: '0 auto',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 2,
                textAlign: 'center',
            }}
        >
            <Typography id="variation-page-title" variant="h4" component="h1">
                Variation Details
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={() => console.log(`Add to Cart: ${variation.addToCart}`)}
                >
                    Add to Cart
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => console.log(`Buy Now: ${variation.addToCart}`)}
                >
                    Buy Now
                </Button>
            </Box>
            <Grid container sx={{ mt: 4, textAlign: 'left' }}>

                {Object.entries(restOfVariation).map(([key, value]) => (
                    <Grid item xs={4}>
                        <Typography key={key} sx={{ mb: 2 }}>
                            <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
                        </Typography>
                    </Grid>
                ))}


            </Grid>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    my: 4,
                }}
            >
                <img src={picture} alt="Variation" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            <Typography variant="h5" color="primary" sx={{ mb: 4 }}>
                Price: {retailPrice}
            </Typography>

        </Box>
    );
};

export default VariationDetailsPage;
