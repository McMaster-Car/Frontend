import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { Grid, TextField, Button, Backdrop, CircularProgress, Toolbar, Container, Select, MenuItem, FormControl, InputLabel, Box, Checkbox, FormControlLabel, FormGroup, Typography, IconButton, Collapse } from '@mui/material';
import Navbar from '../../Others/Navbar';
import { useTheme } from '@emotion/react';
import { addProduct } from '../../../Api/Products/addProduct';
import { fetchAttributes, selectattributes } from '../../../store/Attributes/attributeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '../../../store/Categories/categorySlice';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from '../Components/AddCategoryModal';
import AddAttributeModal from '../Components/AddAttributeModal';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadFileToStorage } from '../../../utils/firebaseUtils';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container spacing={2} sx={{ my: 2 }}>
                    <>
                        {children}
                    </>
                </Grid>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const AddProductPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const attributes = useSelector(selectattributes);
    const categories = useSelector(selectCategories);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [variations, setVariations] = useState([]);
    const [expanded, setExpanded] = useState([]);

    const [openCategory, setOpenCategory] = useState(false);
    const [openAttribute, setOpenAttribute] = useState(false);

    const [value, setValue] = useState(0);


    const [openEdit, setOpenEdit] = useState(false);
    const [editName, setEditName] = useState(null)

    const handleEditOpen = () => {
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };

    const EditAttribute = (attr) => {
        console.log(attr);
        setEditName(attr.name)
        handleEditOpen()
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            categories: selectedCategories,
            variations,
        };
        console.log('Product Data:', productData);

        try {
            const res = await addProduct(productData);
            console.log(res);
            if (res?.success) {
                alert('Product Added Successfully');
                navigate('/admin/products');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddAttribute = () => {
        setSelectedAttributes([...selectedAttributes, { attributeId: '', values: [] }]);
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
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const getAttributeValues = (attributeId) => {
        const attribute = attributes.attributes.find((a) => a._id === attributeId);
        return attribute ? attribute.values : [];
    };

    const getAttributeValue = (attributeId) => {
        const attribute = selectedAttributes.find((a) => a.attributeId === attributeId);
        return attribute ? attribute.values : [];
    };

    const generateVariations = () => {
        const valuesArrays = selectedAttributes.map(attr => getAttributeValue(attr.attributeId));
        const combinations = cartesianProduct(valuesArrays);
        const formattedVariations = combinations.map(combination => {
            const variation = {
                attributes: selectedAttributes.map((attr, index) => ({
                    attributeId: attr.attributeId,
                    value: combination[index]
                })),
                retailPrice: 0,
                salePrice: 0,
                stockQuantity: 0,
                isStockAvailable: true,
                picture: '',
                weight: 0,
                dimensions: {
                    L: 0,
                    W: 0,
                    H: 0
                }
            };
            return variation;
        });
        setVariations(formattedVariations);
    };

    const cartesianProduct = (arrays) => {
        return arrays.reduce((acc, curr) => {
            return acc.flatMap(d => curr.map(e => [d, e].flat()));
        }, [[]]);
    };

    const handleRemoveVariation = (index) => {
        const newVariations = [...variations];
        newVariations.splice(index, 1);
        setVariations(newVariations);
    };

    const toggleExpand = (index) => {
        setExpanded(prevState => {
            const newExpanded = [...prevState];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
    };

    const handleVariationChange = (index, field, value) => {
        const newVariations = [...variations];
        const keys = field.split('.');
        if (keys.length > 1) {
            newVariations[index][keys[0]] = {
                ...newVariations[index][keys[0]],
                [keys[1]]: value
            };
        } else {
            newVariations[index][field] = value;
        }
        setVariations(newVariations);
    };

    const handleFileChange = async (index, event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const downloadURL = await uploadFileToStorage(file);
                handleVariationChange(index, 'picture', downloadURL);
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error if needed
            }
        }
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

                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Category" {...a11yProps(0)} />
                                            <Tab label="Attributes" {...a11yProps(1)} />
                                            <Tab label="Variations" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <Grid item xs={12}>
                                            <Typography variant='h6' sx={{ textAlign: 'center' }}>
                                                Product Categories
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        {selectedAttributes.map((selectedAttr, index) => (
                                            <Fragment key={index}>
                                                <Grid item xs={4}>
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
                                                {selectedAttr.attributeId ? (
                                                    <>
                                                        <Grid item xs={6}>

                                                            <FormControl fullWidth>
                                                                <InputLabel>Values</InputLabel>
                                                                <Select
                                                                    multiple
                                                                    label="Values"
                                                                    value={selectedAttr.values}
                                                                    onChange={(e) => handleAttributeChange(index, 'values', e.target.value)}
                                                                >
                                                                    {getAttributeValues(selectedAttr.attributeId).map((value) => (
                                                                        <MenuItem key={value} value={value}>
                                                                            {value}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>

                                                        </Grid>
                                                        {/* <Grid item xs={2}>

                                                            <Button
                                                                onClick={() => EditAttribute(selectedAttr)}
                                                                sx={{
                                                                    backgroundColor: theme.palette.secondary.main,
                                                                    color: '#fff',
                                                                    "&:hover": {
                                                                        backgroundColor: theme.palette.tertiary.main
                                                                    }
                                                                }}
                                                            >
                                                                New Value
                                                            </Button>
                                                        </Grid> */}

                                                    </>
                                                )
                                                    :
                                                    (
                                                        <>
                                                            <Grid item xs={6}>
                                                            </Grid>
                                                            {/* <Grid item xs={2}>

                                                            <Button
                                                                onClick={() => EditAttribute(selectedAttr)}
                                                                sx={{
                                                                    backgroundColor: theme.palette.secondary.main,
                                                                    color: '#fff',
                                                                    "&:hover": {
                                                                        backgroundColor: theme.palette.tertiary.main
                                                                    }
                                                                }}
                                                            >
                                                                New Value
                                                            </Button>
                                                        </Grid> */}

                                                        </>
                                                    )


                                                }

                                                <Grid item xs={2}>

                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
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
                                                    </Box>
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
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button onClick={handleAttributeOpen} variant='outlined'>
                                                    Add New Attribute
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <AddAttributeModal open={openAttribute} handleClose={handleAttributeClose} />
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <Grid item xs={12}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }} >
                                                <Button
                                                    onClick={generateVariations}
                                                    sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: '#fff',
                                                        "&:hover": {
                                                            backgroundColor: theme.palette.primary.dark
                                                        }
                                                    }}
                                                    disabled={selectedAttributes?.length == 0 || selectedAttributes[0]?.values?.length == 0}
                                                >
                                                    Generate Variations
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {variations.map((variation, index) => (
                                                <Grid container spacing={2} key={index} alignItems="center">

                                                    <Grid item xs={10}>
                                                        <Box sx={{
                                                            display: 'flex', flexDirection: 'row',
                                                            mx: 2, backgroundColor: 'white', p: 3
                                                        }}>
                                                            {variation.attributes.map((attr, attrIndex) => (
                                                                <Typography
                                                                    key={attr.attributeId}
                                                                    sx={{
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >
                                                                    {attributes.attributes.find(attribute => attribute._id === attr.attributeId)?.name}: {attr.value}
                                                                    &nbsp;
                                                                </Typography>
                                                            ))}
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton
                                                            onClick={() => handleRemoveVariation(index)}
                                                            sx={{
                                                                color: theme.palette.error.main,
                                                                "&:hover": {
                                                                    color: theme.palette.error.dark
                                                                }
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => toggleExpand(index)}
                                                            sx={{
                                                                color: theme.palette.primary.main,
                                                                "&:hover": {
                                                                    color: theme.palette.primary.dark
                                                                }
                                                            }}
                                                        >
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    </Grid>

                                                    <Grid item xs={12} >
                                                        <Box sx={{
                                                            p: 3
                                                        }}>
                                                            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            label="Retail Price"
                                                                            variant="outlined"
                                                                            type='number'
                                                                            value={variation.retailPrice}
                                                                            onChange={(e) => handleVariationChange(index, 'retailPrice', e.target.value)}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            type='number'
                                                                            label="Sale Price"
                                                                            variant="outlined"
                                                                            value={variation.salePrice}
                                                                            onChange={(e) => handleVariationChange(index, 'salePrice', e.target.value)}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            label="Weight"
                                                                            variant="outlined"
                                                                            type='number'
                                                                            value={variation.weight}
                                                                            onChange={(e) => handleVariationChange(index, 'weight', e.target.value)}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            label="Stock Quantity"
                                                                            type='number'
                                                                            variant="outlined"
                                                                            value={variation.stockQuantity}
                                                                            onChange={(e) => handleVariationChange(index, 'stockQuantity', e.target.value)}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}
                                                                        display={'flex'}
                                                                        justifyContent={'center'}
                                                                        alignItems={'center'}
                                                                    >
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={variation.isStockAvailable}
                                                                                    onChange={(e) => handleVariationChange(index, 'isStockAvailable', e.target.checked)}
                                                                                />
                                                                            }
                                                                            label="Stock Available"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}
                                                                        display={'flex'}
                                                                        justifyContent={'center'}
                                                                        alignItems={'center'}
                                                                    >

                                                                        <input
                                                                            accept="image/*"
                                                                            style={{ display: 'none' }}
                                                                            id={`contained-button-file-${index}`}
                                                                            type="file"
                                                                            onChange={(e) => handleFileChange(index, e)}
                                                                        />
                                                                        <label htmlFor={`contained-button-file-${index}`}>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                component="span"
                                                                                startIcon={<CloudUploadIcon />}
                                                                            >
                                                                                Upload Picture
                                                                            </Button>
                                                                        </label>

                                                                    </Grid>

                                                                    <Grid item xs={12}>
                                                                        <Box sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'flex-start'
                                                                        }}>
                                                                            <Typography>
                                                                                Dimensions
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            label="length"
                                                                            variant="outlined"
                                                                            type="number"
                                                                            value={variation.dimensions?.L}
                                                                            onChange={(e) => handleVariationChange(index, 'dimensions.L', e.target.value)}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            label="width"
                                                                            variant="outlined"
                                                                            type="number"
                                                                            value={variation.dimensions?.W}
                                                                            onChange={(e) => handleVariationChange(index, 'dimensions.W', e.target.value)}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <TextField
                                                                            label="height"
                                                                            variant="outlined"
                                                                            type="number"
                                                                            value={variation.dimensions?.H}
                                                                            onChange={(e) => handleVariationChange(index, 'dimensions.H', e.target.value)}
                                                                            fullWidth
                                                                        />
                                                                    </Grid>

                                                                </Grid>
                                                            </Collapse>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                </Box>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </Fragment>
        </Suspense>
    );
};

export default AddProductPage;
