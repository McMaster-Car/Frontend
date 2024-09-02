import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../Api/Connection/Connect';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
    const [clientCart, setClientCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('clientCart')) || [];
        setClientCart(cart);

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, []);

    const handleRemoveItem = (index) => {
        let updatedCart = [...clientCart];
        updatedCart.splice(index, 1);
        setClientCart(updatedCart);

        // Update localStorage
        localStorage.setItem('clientCart', JSON.stringify(updatedCart));

        // Update orderCart accordingly
        let orderCart = JSON.parse(localStorage.getItem('orderCart')) || [];
        orderCart.splice(index, 1);
        localStorage.setItem('orderCart', JSON.stringify(orderCart));

        // Update total price
        const total = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handlePlaceOrder = async () => {
        if (!name || !address) {
            alert('Please enter both your name and address.');
            return;
        }

        const orderCart = JSON.parse(localStorage.getItem('orderCart')) || [];

        const orderData = {
            name,
            address,
            products: orderCart
        };

        try {
            const response = await Axios.post('/order/createOrder', {
                orderData
            })
            // const response = await fetch('http://localhost:5000/api/order/createOrder', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(orderData),
            // });

            if (response.status == 201) {
                // Clear both carts
                localStorage.removeItem('clientCart');
                localStorage.removeItem('orderCart');

                // Alert and redirect
                alert('Order placed successfully');
                navigate('/');
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing the order. Please try again.');
        }
    };

    if (clientCart.length === 0) {
        return <Typography variant="h6">Your cart is empty</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Your Cart
            </Typography>
            <Grid container spacing={2} >
                {clientCart.map((item, index) => (
                    <Grid item xs={12} mx={2} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', pb: 2, mb: 2 }}>
                            <img src={item.picture} alt={item.name} style={{ width: 100, marginRight: 16 }} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography>Price: ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</Typography>
                            </Box>


                            <DeleteIcon
                                onClick={() => handleRemoveItem(index)}
                                sx={{
                                    cursor: 'pointer'
                                }}
                                color='error'
                            />

                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                <Button variant="outlined" color="secondary" sx={{ mt: 4 }} onClick={handleOpenDialog}>
                    Buy Now
                </Button>
                <Typography variant="h5" sx={{ mt: 4 }}>
                    Total Price: ${totalPrice.toFixed(2)}
                </Typography>

            </Box>

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Enter Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        type="text"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handlePlaceOrder} color="primary">
                        Place Order
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CartPage;
