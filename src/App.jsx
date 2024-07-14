
import React, { Suspense, lazy, Fragment, useState, useDeferredValue, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Routes = lazy(() => import('./Router/router'))
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/products/productsSlice';
import { fetchCategories } from './store/Categories/categorySlice';
import { fetchAttributes } from './store/Attributes/attributeSlice';


function App() {

  const dispatch = useDispatch()
  const [loading , setLoading] = useState(true)

  useEffect(() => {

    dispatch(fetchCategories())
    dispatch(fetchAttributes())
    dispatch(fetchProducts())
    
    setTimeout(()=>{
      setLoading(false)
    },2000)
  
   
  }, [])
  

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
      <>
        <Fragment>
          <Routes />
        </Fragment>
      </>
    </Suspense>
  )
}

export default App
