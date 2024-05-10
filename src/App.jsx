
import React, { Suspense, lazy, Fragment, useState, useDeferredValue, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Routes = lazy(() => import('./Router/router'))
import store from './store/store';
import { Provider } from 'react-redux';

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
      <Provider store={store}>
        <Fragment>
          <Routes />
        </Fragment>
      </Provider>
    </Suspense>
  )
}

export default App
