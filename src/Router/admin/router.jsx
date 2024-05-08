import { AppBar, Backdrop, Box, Button, CircularProgress, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import React, { Suspense, lazy, Fragment } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
const Dashboard = lazy(() => import("../../Pages/Dashboard"));
const Products = lazy(() => import("../../Pages/admin/Products"));
const Users = lazy(() => import("../../Pages/admin/Users"));
const Orders = lazy(() => import("../../Pages/admin/Orders"));
const Reports = lazy(() => import("../../Pages/admin/Reports"));




export default function routess() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (

        <Suspense fallback={
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        }>
            <Fragment>
                
               
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/admin/products" element={<Products />} />
                            <Route path="/admin/orders" element={<Orders />} />
                            <Route path="/admin/users" element={<Users />} />
                            <Route path="/admin/reports" element={< Reports />} />

                            <Route path="/*" element={<Navigate to="/" replace />} />
                        </Routes>
                    
                
            </Fragment>
        </Suspense>


    )
}
