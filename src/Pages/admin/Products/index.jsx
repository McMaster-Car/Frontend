import { Backdrop, Box, CircularProgress, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import React, { Fragment, Suspense } from 'react'
import Navbar from '../../Others/Navbar'
import ProductTable from './components/table'

function Products() {
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
        <Navbar pageName={'Products'} />
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
               
                <Grid item xs={12} md={12} lg={12}>
                    <ProductTable />
                </Grid>
            
              </Grid>
             
            </Container>
          </Box>
          </Box>
        </Fragment>
    </Suspense>
  )
}

export default Products