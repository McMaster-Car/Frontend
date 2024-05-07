import { Backdrop, CircularProgress } from '@mui/material';
import React, { Suspense, lazy, Fragment } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
const Dashboard = lazy(() => import("../../Pages/Dashboard"));

export default function routess() {
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
                    <Route path="/admin/products" element={<> Products </>} />
                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Routes>
            </Fragment>
        </Suspense>


    )
}
