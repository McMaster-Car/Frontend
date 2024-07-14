import { Backdrop, Box, Button, CircularProgress, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import Navbar from '../../Others/Navbar'
import ProductTable from './components/ProductTable'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts } from '../../../store/products/productsSlice';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';

function Products() {

  const theme = useTheme()

  const dispatch = useDispatch();
  const data = useSelector(selectProducts);

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)




  useEffect(() => {
    setLoading(true)
    dispatch(fetchProducts());
    setLoading(false)
  }, [dispatch])

  if (loading) return (
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
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Fragment>
    </Suspense>
  )
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Button


                      onClick={() => navigate('/admin/add-product')}
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        border: '1 solid #178582', borderRadius: 2,
                        color: '#fff',
                        "&:hover": {
                          color: '#000',
                          backgroundColor: '#0da39f'

                        }
                      }}
                    >
                      Add Product
                    </Button>
                    <Typography sx={{
                      mx:3,
                      fontWeight : 'bolder',
                      mt:1
                    }}>
                      Or
                    </Typography> 
                    <FileUpload />
                  </Box>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <ProductTable products={data?.products ? data.products : []} />
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