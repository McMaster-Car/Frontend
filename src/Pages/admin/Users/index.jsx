import { Backdrop, Box, CircularProgress, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import Navbar from '../../Others/Navbar'
import { getUsers } from '../../../Api/Users/getUsers'
import UserTable from './components/UserTable'

function Users() {

    const [loading , setLoading ] = useState(true)
    const [user , setUser] = useState([])

    const fetchData = async ()=> {
        setLoading(true)
        const  res = await getUsers()
        console.log(res);
        if(res.success) {
            setUser(res.Users)
            if(user.length != 0 ) setLoading(false)
        }
        
    }

    useEffect(()=> {
        
        fetchData()
    },[])

  return (
    <Suspense 
    fallback={
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      >
          
        <Fragment>
        <Box sx={{ display: 'flex' }}>
        <Navbar pageName={'Users'} />
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
              <Grid container spacing={3}>
               
               {
                user.length > 0 &&
                ( <Grid item xs={12} md={12} lg={12}>
                   <UserTable Users={user} />
                </Grid>)
                }
            
              </Grid>
             
            </Container>
          </Box>
          </Box>
        </Fragment>
    </Suspense>
  )
}

export default Users