import React, { Fragment, Suspense, useState } from 'react';
import { Grid, TextField, Button, Backdrop, CircularProgress, Toolbar, Container } from '@mui/material';
import { Box } from '@mui/material';
import Navbar from '../../Others/Navbar';
import { useTheme } from '@emotion/react';
import { addProduct } from '../../../Api/Products/addProduct';

const AddProductPage = () => {

    const theme = useTheme()

    const [productData, setProductData] = useState({
        'Bickle Part Numbers': '',
        'Country of Origin': '',
        'Category': '',
        'Sub Category': '',
        'Sub 2 Cateogory': '',
        'Sub 3 Category': '',
        'Pitch TPI (Diameter)': '',
        'Thread (diameter)': '',
        'Equivivalent Diameter': '',
        'Thread Pitch': '',
        'Pitch': '',
        'Body (length)': '',
        'Threading ': '',
        'Thread Lg Min': '',
        'Thread Spacing': '',
        'Thread Type': '',
        'Head (Width)': '',
        'Head (Height)': '',
        'Wrench Size': '',
        'Tensile (Strength PSI)': '',
        'Specification Met': '',
        'Package (Quantity)': '',
        ' Package Cost(2023) ': '',
        'Description pt': {
            '1': '',
            '2': ''
        },
        'Thread Direction': '',
        'Material': '',
        'System Of Measurement': '',
        'Fastener   Head  Type': '',
        'Drive Style': '',
        'Fastener Strength': '',
        'Grade ': '',
        'Surface': '',
        'Hardness': '',
        'MFG Part 1 Number': '',
        'Thread Fit': '',
    });

    const handleChange = (key, value, subKey) => {
        if (subKey !== undefined) {
            setProductData(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    [subKey]: value
                }
            }));
        } else {
            setProductData(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    const handleAddProduct = async () => {
        console.log('Product Data:', productData);

        try {
            const res = await addProduct(productData)
            console.log(res);
        } catch (error) {
            console.log(error); 
        }
    };

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
                    <Navbar pageName={'Add Product'} />
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

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        <Button


                                            onClick={handleAddProduct}
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

                                    </Box>
                                </Grid>
                                {Object.keys(productData).map((key, index) => (
                                    <Grid item xs={12} sm={4} key={index}>
                                        {typeof productData[key] === 'object' ? (
                                            Object.keys(productData[key]).map((subKey, subIndex) => (
                                                <TextField
                                                    key={subIndex}
                                                    label={`${key} ${subKey}`}
                                                    value={productData[key][subKey]}
                                                    onChange={(e) => handleChange(key, e.target.value, subKey)}
                                                    fullWidth
                                                />
                                            ))
                                        ) : (
                                            <TextField
                                                label={key}
                                                value={productData[key]}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                fullWidth
                                            />
                                        )}
                                    </Grid>
                                ))}
                            </Grid>



                        </Container>
                    </Box>
                </Box>
            </Fragment>
        </Suspense>
    );
};

export default AddProductPage;
