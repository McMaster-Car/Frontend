import { 
    Backdrop, 
    Box,
    Button, 
    CircularProgress, 
    Container, 
    Grid, 
    Paper, 
    Toolbar, 
    Typography
 } from '@mui/material'
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import Navbar from '../../Others/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributes, selectattributes } from '../../../store/Attributes/attributeSlice';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import AttributeTable from './Components/AttritbuteTable';
import AddAttributeModal from '../Components/AddAttributeModal';

function Attributes() {

  const theme = useTheme()

  const dispatch = useDispatch();
  const data = useSelector(selectattributes);

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  useEffect(() => {
    setLoading(true)
    dispatch(fetchAttributes());
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
          <Navbar pageName={'Attributes'} />
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


                      onClick={handleOpen}
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
                      Add Attribute
                    </Button>

                  </Box>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <AttributeTable Attributes={data?.attributes ? data.attributes : []} />
                </Grid>

              </Grid>

              <AddAttributeModal open={open} handleClose={handleClose} />
            </Container>
          </Box>
        </Box>
      </Fragment>
    </Suspense>
  )
}

export default Attributes