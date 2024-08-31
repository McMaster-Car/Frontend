import { Backdrop, Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProducts } from '../../../../store/products/productsSlice';
import Axios from '../../../../Api/Connection/Connect';

function ProductList({ categoryId, filteredProducts }) {

    const productsResponse = useSelector(selectProducts);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();


    const [products, setProducts] = useState([])


    useEffect(() => {

        if (filteredProducts.length == 0) {

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

    const handleCardClick = async (product) => {
        setLoading(true)
        var id, isParentID
        if (product.Parent_Product_ID != null) {
            id = product.Parent_Product_ID
            isParentID = true
        }
        else {
            id = product._id
            isParentID = false
        }
        console.log("products Parent Product ID ", id);

        const res = await Axios.get(`/products/getProduct-withVariation/${id}/${isParentID}`)
        console.log(res.data);
        const Backendproduct = res.data.data
        setLoading(false)
        navigate('/product', { state: { Backendproduct } });
    };


    return (
        <Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <>
                <Typography gutterBottom variant="p" component="div" sx={{ my: 2 }}>
                    {`${products?.length} products`}
                </Typography>
                <Grid container spacing={2}>
                    {products?.map((product) => (
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
            </>

        </Box>
    );
    //fix this
}

export default ProductList;
