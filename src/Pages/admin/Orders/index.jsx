import { Backdrop, Box, CircularProgress, Container, Grid, IconButton, Paper, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Fragment, Suspense } from 'react'
import Navbar from '../../Others/Navbar'
import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Axios from '../../../Api/Connection/Connect';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';


function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    // Replace this with your actual API call to fetch orders
    await Axios.get('/order/getAllOrders').then((res) => setOrders(res.data));

  };

  const handleViewOrder = (orderId) => {
    console.log(orderId);
    
    navigate(`/admin/order/${orderId}`);
  };

  useEffect(() => {
    // Fetch the orders from your API or data source
    fetchOrders();
  }, []);

  const handleMarkAsDelivered = async (orderId) => {
    console.log(`Marking order ${orderId} as delivered`);
    await Axios.patch(`/order/delivered/${orderId}`).then( async (res) => {
      if(res.status == 200) {
        await Axios.get('/order/getAllOrders').then((newData) => {
          setOrders(newData.data)
          setTimeout(() => {
            alert('Updated Record Successfully')
          }, 1000);
        });

      }
    })
    // Add API call to mark order as delivered here
  };

  const handleRemoveOrder = async (orderId) => {
    console.log(`Removing order ${orderId}`);
    await Axios.delete(`/order/deleteOrder/${orderId}`).then( async (res) => {
      if(res.status == 204) {
        await Axios.get('/order/getAllOrders').then((newData) => {
          setOrders(newData.data)
          setTimeout(() => {
            alert('Deleted Order Successfully')
          }, 1000);
        });

      }
    })
    // Add API call to remove order here
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateString);

    // Use toLocaleString to get the desired format
    return date.toLocaleString('en-GB', options).replace(',', '');
  };

  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >

      <Fragment>
        <Box sx={{ display: 'flex' }}>
          <Navbar pageName={'Orders'} />
          <Box
            component="main"
            sx={{
              backgroundColor: 'whitesmoke',
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Delivered</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>{order.address}</TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <TableCell>{order.isDelivered ? "Yes" : "No"}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>

                        <TableCell>
                        <Tooltip title='View Order'>
                          <IconButton onClick={() => handleViewOrder(order._id)}>
                            <VisibilityIcon color='primary' />
                          </IconButton>
                          </Tooltip>
                          {order.isDelivered ?
                            <></> :
                            <Tooltip title='Mark As Delivered'>
                              <IconButton onClick={() => handleMarkAsDelivered(order._id)}>
                                <DoneOutlineIcon color='secondary' />
                              </IconButton>
                            </Tooltip>
                          }
                        <Tooltip title='Delete Order'>

                          <IconButton onClick={() => handleRemoveOrder(order._id)}>
                            <DeleteIcon color='error' />
                          </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Box>
        </Box>
      </Fragment>
    </Suspense>
  )
}

export default Orders