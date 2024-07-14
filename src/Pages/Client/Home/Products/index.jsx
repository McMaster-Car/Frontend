import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../store/products/productsSlice';

function Products({ categoryId }) {

    const productsResponse = useSelector(selectProducts);



    const filteredProducts = productsResponse?.products?.filter(
        (product) => product.categories[0]._id === categoryId
    );


    return (
        <Box>
            {`${filteredProducts?.length} products`}
        </Box>
    );
}

export default Products;
