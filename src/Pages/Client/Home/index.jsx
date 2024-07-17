import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../store/Categories/categorySlice';
import { Suspense } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import MainComponent from './Components/main';
import { useParams } from 'react-router-dom';

function Home() {
  const categoryResponse = useSelector(selectCategories);
  const { categoryId } = useParams();
  

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
        {categoryResponse.categories && categoryResponse.categories.length > 0 && (
          <MainComponent
            categories={categoryResponse.categories}
            initialCategoryId={categoryId}
          />
        )}
      </Fragment>
    </Suspense>
  );
}

export default Home;
