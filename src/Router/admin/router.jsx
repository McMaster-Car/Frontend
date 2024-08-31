import { AppBar, Backdrop, Box, Button, CircularProgress, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import React, { Suspense, lazy, Fragment } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import VariationDetailsPage from '../../Pages/Client/Products/VariationDetailsModal';
import OrderDetails from '../../Pages/admin/Orders/Details/OrderDetails'
const Attributes = lazy(() => import('../../Pages/admin/Attributes'));
const Category = lazy(() => import('../../Pages/admin/Categories'));
const Dashboard = lazy(() => import("../../Pages/Dashboard"));
const Products = lazy(() => import("../../Pages/admin/Products"));
const Users = lazy(() => import("../../Pages/admin/Users"));
const Orders = lazy(() => import("../../Pages/admin/Orders"));
const Reports = lazy(() => import("../../Pages/admin/Reports"));
const AddProductPage = lazy(() => import("../../Pages/admin/Products/Add_Products"));
const SignIn = lazy(() => import('../../Pages/Auth/SignIn'));
const SignUp = lazy(() => import('../../Pages/Auth/SignUp'));
const Home = lazy(() => import("../../Pages/Client/Home"));
const ProductDetails = lazy(() => import("../../Pages/Client/Products"));





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
                    <Route
                        path="/"
                        element={
                            <Home />
                        }
                    />
                    <Route path="/:categoryId" element={<Home />} />
                    <Route path="/product" element={<ProductDetails />} />


                    <Route
                        path="/variation-details"
                        element={
                            <VariationDetailsPage />
                        }
                    />
                    <Route path='/SignIn' element={<SignIn />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin/products" element={<Products />} />
                    <Route path="/admin/attributes" element={<Attributes />} />
                    <Route path="/admin/categories" element={<Category />} />


                    <Route path="/admin/add-product" element={<AddProductPage />} />

                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/order/:orderId" element={<OrderDetails />} />

                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/reports" element={< Reports />} />

                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Routes>


            </Fragment>
        </Suspense>


    )
}
