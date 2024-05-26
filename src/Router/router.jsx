import React, { Suspense, lazy, Fragment, useState, useDeferredValue, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
const LandingPage = lazy(() => import("../Pages/Dashboard"));
const AdminRoutes = lazy(() => import("./admin/router"));
const SignIn = lazy(() => import('../Pages/Auth/SignIn'));
const SignUp = lazy(() => import('../Pages/Auth/SignUp'));
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function routes() {

    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const localStorageUser = JSON.parse(localStorage.getItem('User'))

        //const userdata = JSON.parse(localStorageUser)
        if (localStorageUser?.isAdmin)
            setIsAdmin(true)

        setLoading(false)
    }, [])

    if (loading)
        return
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>


    //Provide Admin Route Here
    if (isAdmin) {
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
                    <Routes>
                        <Route path="/*" element={<AdminRoutes />} />
                    </Routes>
                </Fragment>
            </Suspense>
        )
    }

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
                <Routes>
                    <Route path="/" element={
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <h1>
                                Landing Page is yet to be created
                            </h1>
                            <h4>
                                Please reach us soon
                            </h4>
                        </div>
                    } />
                    <Route path='/SignIn' element={<SignIn />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Routes>
            </Fragment>
        </Suspense>
    )
}
