import { Backdrop, Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../store/products/productsSlice';

function Products({ categoryId, filteredProducts }) {

    const productsResponse = useSelector(selectProducts);
    const [loading , setLoading] = useState(true)


    const [products, setProducts] = useState([])


    useEffect(() => {

        if (filteredProducts.length == 0) {

            console.log("Filtered Products are 0 ");
            var productsByCat = productsResponse?.products?.filter(
                (product) => product.categories[0]._id === categoryId
            );
            setProducts(productsByCat)
        }
        else {
            setProducts(filteredProducts)
        }
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }, [filteredProducts])


    return (
        <Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <>
            <Typography gutterBottom variant="p" component="div" sx={{my:2}}>
                {`${products?.length} products`}
            </Typography>
                <Grid container spacing={2}>
                    {products?.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <Card>
                                <CardActionArea onClick={() => console.log(product._id)}>
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
            </>

        </Box>
    );
    //fix this
}

export default Products;
