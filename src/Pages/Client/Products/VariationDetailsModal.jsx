import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, TextField, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Axios from '../../../Api/Connection/Connect';

const VariationDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { variation } = location.state || {};
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isInCart, setIsInCart] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    if (!variation) return <div>No variation data available.</div>;

    useEffect(() => {
        const fetchProductID = async () => {
            try {
                const res = await Axios.get(`/products/get-product-using-variation/${variation.addToCart}`);
                setProductId(res.data.productId);
                setProductName(res.data.productName);
                setProductDescription(res.data.description);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProductID();

        // Check if the item is already in the cart
        const orderCart = JSON.parse(localStorage.getItem('orderCart')) || [];
        const itemInCart = orderCart.some(item => item.variationId === variation.addToCart);
        setIsInCart(itemInCart);

        // Update cart count
        setCartCount(orderCart.length);
    }, [variation.addToCart]);

    const handleAddToCart = () => {
        const maxQuantityString = variation['Pkg Qty']; // Access "Pkg Qty" as a string
        const maxQuantity = maxQuantityString ? parseInt(maxQuantityString, 10) : null;
    
        // If "Pkg Qty" exists, validate the quantity against it
        if (maxQuantity && quantity > maxQuantity) {
            alert(`Quantity can't be higher than ${maxQuantity}`);
            return;
        }
    
        // Remove any dollar signs from the price and parse it as a number
        const priceString = variation.retailPrice.toString().replace('$', '');
        const price = parseFloat(priceString);
    
        const cartItem = {
            variationId: variation.addToCart,
            productId,
            quantity,
            price,
        };
    
        // Save to orderCart and clientCart in localStorage
        let orderCart = JSON.parse(localStorage.getItem('orderCart')) || [];
        let clientCart = JSON.parse(localStorage.getItem('clientCart')) || [];
    
        orderCart.push(cartItem);
        clientCart.push({
            ...cartItem,
            name: productName, // Assuming you have a variable 'productName'
            description: productDescription, // Assuming you have a variable 'productDescription'
            picture: variation.picture,
        });
    
        localStorage.setItem('orderCart', JSON.stringify(orderCart));
        localStorage.setItem('clientCart', JSON.stringify(clientCart));
    
        alert('Item added to cart successfully');
        setIsInCart(true);
        setCartCount(orderCart.length);
    };
    

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
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
            }}>
                <IconButton onClick={() => navigate('/cart')} color="primary">
                    <Badge badgeContent={cartCount} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <Box>
                    <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        sx={{ width: 80, mr: 2 }}
                        InputProps={{ inputProps: { min: 1, max: variation.pkgQty } }} // Set max to Pkg Qty
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={handleAddToCart}
                        disabled={isInCart} // Disable if item is already in cart
                    >
                        Add to Cart
                    </Button>

                </Box>
            </Box>
            <Grid container sx={{ mt: 4, textAlign: 'left' }}>
                {Object.entries(restOfVariation).map(([key, value]) => (
                    <Grid item xs={4} key={key}>
                        <Typography sx={{ mb: 2 }}>
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
