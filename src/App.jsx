
import React, { Suspense, lazy, Fragment, useState, useDeferredValue, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Routes = lazy(() => import('./Router/router'))


function App() {

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
      <>
        <Fragment>
          <Routes />
        </Fragment>
      </>
    </Suspense>
  )
}

export default App
