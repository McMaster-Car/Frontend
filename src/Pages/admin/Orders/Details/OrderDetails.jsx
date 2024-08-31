import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import Axios from '../../../../Api/Connection/Connect';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const fetchOrderDetails = async () => {
        // Replace this with your actual API call to fetch the single order
        await Axios.get(`/order/getOneOrder/${orderId}`).then(res => setOrder(res.data));
        
    };

    if (!order) return <Typography>Loading...</Typography>;

    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant="h4">Order Details</Typography>
            <Typography variant="h6">Name: {order.name}</Typography>
            <Typography variant="h6">Address: {order.address}</Typography>
            <Typography variant="h6">Total Price: {order.totalPrice}</Typography>
            <List>
                {order.products.map((product) => (
                    <ListItem key={product._id}>
                        <ListItemText
                            primary={product.productId.name}
                            secondary={`Quantity: ${product.quantity}, Price: $${product.price}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default OrderDetails;
