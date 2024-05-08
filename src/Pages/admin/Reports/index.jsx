import { Backdrop, Box, CircularProgress, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import React, { Fragment, Suspense } from 'react'
import Navbar from '../../Others/Navbar'

function Reports() {
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
        <Navbar pageName={'Reports'} />
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
                    <Typography>
                        Reports
                    </Typography>
                </Grid>
            
              </Grid>
             
            </Container>
          </Box>
          </Box>
        </Fragment>
    </Suspense>
  )
}

export default Reports