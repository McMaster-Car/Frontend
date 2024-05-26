import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { Grid, TextField, Button, Backdrop, CircularProgress, Toolbar, Container, Select, MenuItem, FormControl, InputLabel, Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import Navbar from '../../Others/Navbar';
import { useTheme } from '@emotion/react';
import { addProduct } from '../../../Api/Products/addProduct';
import { fetchAttributes, selectattributes } from '../../../store/Attributes/attributeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '../../../store/Categories/categorySlice';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from '../Components/AddCategoryModal';
import AddAttributeModal from '../Components/AddAttributeModal';

const AddProductPage = () => {

    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const attributes = useSelector(selectattributes);
    const categories = useSelector(selectCategories);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [openCategory, setOpenCategory] = useState(false);
    const [openAttribute, setOpenAttribute] = useState(false);


    const handleCategoryOpen = () => setOpenCategory(true);
    const handleCategoryClose = () => setOpenCategory(false);

    const handleAttributeOpen = () => setOpenAttribute(true);
    const handleAttributeClose = () => setOpenAttribute(false);


    useEffect(() => {
        setLoading(true);
        dispatch(fetchAttributes());
        dispatch(fetchCategories());
        setLoading(false);
    }, [dispatch]);

    const handleAddProduct = async () => {
        const productData = {
            name,
            description,
            attributes: selectedAttributes,
            categories: selectedCategories
        };
        console.log('Product Data:', productData);

        try {
            const res = await addProduct(productData);
            console.log(res);
            if (res?.success) {
                alert('Product Added Successfully')
                navigate('/admin/products')
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddAttribute = () => {
        setSelectedAttributes([...selectedAttributes, { attributeId: '', value: '' }]);
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...selectedAttributes];
        newAttributes[index][field] = value;
        setSelectedAttributes(newAttributes);
    };


    const handleRemoveAttribute = (index) => {
        const newAttributes = [...selectedAttributes];
        newAttributes.splice(index, 1);
        setSelectedAttributes(newAttributes);
    };

    const handleCategoryChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const getAttributeValues = (attributeId) => {
        const attribute = attributes.attributes.find((a) => a._id === attributeId);
        return attribute ? attribute.values : [];
    };

    if (loading) return (
        <Suspense fallback={<Fragment></Fragment>}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Suspense>
    );

    return (
        <Suspense fallback={<Fragment></Fragment>}>
            <Fragment>
                <Box sx={{ display: 'flex' }}>
                    <Navbar pageName={'Add Product'} />
                    <Box component="main" sx={{ backgroundColor: 'whitesmoke', flexGrow: 1, height: '100vh', overflow: 'auto' }}>
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Button
                                            onClick={handleAddProduct}
                                            sx={{
                                                backgroundColor: theme.palette.secondary.main,
                                                border: '1 solid #178582',
                                                borderRadius: 2,
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
                                <Grid item xs={4}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Name"
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Description"
                                        variant="outlined"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>

                                {selectedAttributes.map((selectedAttr, index) => (
                                    <Fragment key={index}>
                                        <Grid item xs={5}>
                                            <FormControl fullWidth>
                                                <InputLabel>Attribute</InputLabel>
                                                <Select
                                                    label="Attribute"
                                                    value={selectedAttr.attributeId}
                                                    onChange={(e) => handleAttributeChange(index, 'attributeId', e.target.value)}
                                                >
                                                    {attributes.attributes.map((attribute) => (
                                                        <MenuItem key={attribute._id} value={attribute._id}>
                                                            {attribute.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={5}>
                                            {selectedAttr.attributeId && (
                                                <FormControl fullWidth>
                                                    <InputLabel>Value</InputLabel>
                                                    <Select
                                                        label="Value"
                                                        value={selectedAttr.value}
                                                        onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                                                    >
                                                        {getAttributeValues(selectedAttr.attributeId).map((value) => (
                                                            <MenuItem key={value} value={value}>
                                                                {value}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )
                                            }
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                onClick={() => handleRemoveAttribute(index)}
                                                sx={{
                                                    backgroundColor: theme.palette.error.main,
                                                    color: '#fff',
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.error.dark
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Fragment>
                                ))}
                                <Grid item xs={6}>
                                    <Button
                                        onClick={handleAddAttribute}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: '#fff',
                                            "&:hover": {
                                                backgroundColor: theme.palette.primary.dark
                                            }
                                        }}
                                    >
                                        Add Existing Attribute
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{
                                        display:'flex',
                                        justifyContent:'flex-end'
                                    }}>
                                        <Button
                                            onClick={handleAttributeOpen}
                                            variant='outlined'
                                        >
                                            Add New Attribute
                                        </Button>
                                    </Box>
                                </Grid>
                                <AddAttributeModal open={openAttribute} handleClose={handleAttributeClose} />

                                <Grid item xs={12}>
                                    <Typography variant='h6' sx={{
                                        textAlign: 'center'
                                    }}>
                                        Product Categories
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Button onClick={handleCategoryOpen} color='primary' variant='outlined'>
                                            Add New Category
                                        </Button>
                                    </Box>
                                    <AddCategoryModal open={openCategory} onClose={handleCategoryClose} categories={categories?.categories ? categories.categories : []} />

                                    <FormGroup row>
                                        {categories.categories?.map((category) => (
                                            <Grid item xs={3} key={category._id}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={selectedCategories.includes(category._id)}
                                                            onChange={() => handleCategoryChange(category._id)}
                                                        />
                                                    }
                                                    label={category.name}
                                                />
                                            </Grid>
                                        ))}
                                    </FormGroup>
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </Fragment>
        </Suspense>
    );
};

export default AddProductPage;
