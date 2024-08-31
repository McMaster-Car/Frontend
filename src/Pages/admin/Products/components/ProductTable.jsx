import { Fragment, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Modal, Typography, TextField, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../../store/products/productsSlice';
import Axios from '../../../../Api/Connection/Connect';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { uploadFileToStorage } from '../../../../utils/firebaseUtils';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ProductTable = ({ products }) => {

    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [productIdToDelete, setProductIdToDelete] = useState('');
    const [openEditVariation, setOpenEditVariation] = useState(false);
    const [variationDetails, setVariationDetails] = useState({
        retailPrice: '',
        salePrice: '',
        stockQuantity: '',
        isStockAvailable: '',
        picture: ''
    })

    const dispatch = useDispatch();

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 200,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 300,
            },
            {
                accessorKey: 'SKU',
                header: 'SKU',
                size: 100,
            },
            {
                accessorKey: 'attributes',
                header: 'Attributes',
                size: 250,
                Cell: ({ cell }) => {
                    const attributes = cell.getValue().split('\n ');
                    return (
                        <div>
                            {attributes.map((attr, index) => {
                                const [attributeName, value] = attr.split(': ');
                                return (
                                    <div key={index}>
                                        <strong>{attributeName}</strong>: {value}
                                    </div>
                                );
                            })}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'categories',
                header: 'Categories',
                size: 250,
            },
            {
                accessorKey: 'retailPrice',
                header: 'Retail Price',
                size: 100,
            },
            {
                accessorKey: 'salePrice',
                header: 'Sale Price',
                size: 100,
            },
            {
                accessorKey: 'stockQuantity',
                header: 'Stock Quantity',
                size: 100,
            },
            {
                accessorKey: 'isStockAvailable',
                header: 'Stock Available',
                size: 100,
            },
            {
                accessorKey: 'picture',
                header: 'Picture',
                size: 200,
                Cell: ({ cell }) => <img src={cell.getValue()} alt="Product Image" style={{ width: '100px' }} />,
            },
            {
                accessorKey: 'Actions',
                header: 'Actions',
                size: 180,
                Cell: ({ row }) => (
                    <div>
                        <VisibilityIcon
                            sx={{
                                cursor: 'pointer',
                                mr: 1
                            }}
                            onClick={() => viewProduct(row.original)} color='secondary' />
                        <Tooltip title="Edit Product">
                            <EditIcon
                                sx={{
                                    cursor: 'pointer',
                                    mr: 1
                                }}
                                onClick={() => handleEditOpen(row.original)}
                                color='primary'
                            />

                        </Tooltip>
                        <Tooltip title="Edit Variation">
                            <BorderColorIcon
                                sx={{
                                    cursor: 'pointer',
                                    mr: 1
                                }}
                                onClick={() => handleEditVariationOpen(row.original)}
                                color='third'
                            />
                        </Tooltip>
                        <DeleteIcon
                            sx={{
                                cursor: 'pointer'
                            }}
                            onClick={() => handleDeleteOpen(row.original.id)} color='error' />
                    </div>
                ),
            },
        ],
        [],
    );

    const data = useMemo(() => {
        return products.map(product => {
            const attributesString = product.variation.attributes
                .map(attr => `${attr.attributeName}: ${attr.value}`)
                .join('\n ');

            const categoriesString = product.categories
                .map(cat => cat.name)
                .join(', ');

            return {
                'id': product._id,
                'name': product.name,
                'description': product.description,
                'SKU': product.SKU,
                'attributes': attributesString,
                'categories': categoriesString,
                'retailPrice': product.variation.retailPrice,
                'salePrice': product.variation.salePrice,
                'stockQuantity': product.variation.stockQuantity,
                'isStockAvailable': product.variation.isStockAvailable ? 'Yes' : 'No',
                'picture': product.variation.picture,
                'variation_id': product.variation._id,

            };
        });
    }, [products]);

    const table = useMaterialReactTable({
        columns,
        data,
    });

    const viewProduct = (product) => {
        setSelectedProduct(product);
        setOpenView(true);
    };

    const handleCloseView = () => {
        setOpenView(false);
    };

    const handleDeleteOpen = async (id) => {

        try {
            const res = await Axios.delete(`/products/delete-product/${id}`);
            if (res.data.success) {
                dispatch(fetchProducts()).then(() => {
                    alert(res.data.message);
                }).catch((err) => {
                    console.log(err);
                });

            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };
    const handleEditVariationOpen = (product) => {
        setSelectedProduct(product);
        setVariationDetails({
            retailPrice: product.retailPrice,
            salePrice: product.salePrice,
            stockQuantity: product.stockQuantity,
            isStockAvailable: product.isStockAvailable === 'Yes',
            picture: product.picture,
        });
        setOpenEditVariation(true);
    };
    const handleEditVariationClose = () => {
        setOpenEditVariation(false);
    };
    const handleVariationChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVariationDetails({
            ...variationDetails,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const downloadURL = await uploadFileToStorage(file); 
                setVariationDetails((prevDetails) => ({
                    ...prevDetails,
                    picture: downloadURL,
                }));
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleEditVariationSubmit = async () => {
        console.log('Updated Variation Details:', variationDetails);
        console.log('Variation ID:', selectedProduct.variation_id);
        Axios.put(`/products/editVariationData/${selectedProduct.variation_id}`, { data: variationDetails }).then((res) => {
            console.log(res);
            if (res.data.isEdited) {
                dispatch((fetchProducts))
                alert('Updated Successfully')
            }

        }).catch((err) => {
            console.log(err);

        }).finally(() => {
            setTimeout(() => {
                setOpenEditVariation(false);
            }, 1000);
        })
        
       
    };
    const handleCloseEdit = () => {
        setOpen(false);
    };

    const handleUpdate = () => {

        const data = {
            name: selectedProduct.name,
            SKU: selectedProduct.SKU,
            description: selectedProduct.description,
        }
        Axios.put(`/products/editProductData/${selectedProduct.id}`, { data: data }).then((res) => {
            console.log(res);
            if (res.data.isEdited) {
                dispatch((fetchProducts))
                alert('Updated Successfully')
            }

        }).catch((err) => {
            console.log(err);

        }).finally(() => {
            setTimeout(() => {
                setOpen(false);
            }, 1000);
        })

    };

    const handleChange = (e) => {
        setSelectedProduct({
            ...selectedProduct,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Fragment>
            <MaterialReactTable table={table} />

            {/* Dialog for viewing product details */}
            <Dialog open={openView} onClose={handleCloseView} maxWidth="md" fullWidth>
                <DialogActions>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseView}
                        color="error"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <DialogTitle>{selectedProduct.name}</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Description:</strong> {selectedProduct.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Attributes:</strong></Typography>
                            <Box>
                                {selectedProduct.attributes?.split('\n ').map((attr, index) => {
                                    const [attributeName, value] = attr.split(': ');
                                    return (
                                        <Typography key={index} variant="body2"><strong>{attributeName}:</strong> {value}</Typography>
                                    );
                                })}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Categories:</strong> {selectedProduct.categories}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Retail Price:</strong> ${selectedProduct.retailPrice}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Sale Price:</strong> ${selectedProduct.salePrice}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Stock Quantity:</strong> {selectedProduct.stockQuantity}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"><strong>Stock Available:</strong> {selectedProduct.isStockAvailable}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <img src={selectedProduct.picture} alt="Product" style={{ width: '100%' }} />
                        </Grid>
                    </Grid>
                </DialogContent>

            </Dialog>

            {/* Modal for editing product */}
            <Dialog open={open} onClose={handleCloseEdit} maxWidth="md" fullWidth>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} p={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                value={selectedProduct.name || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="SKU"
                                name="SKU"
                                value={selectedProduct.SKU || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={selectedProduct.description || ''}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing variation */}
            <Dialog open={openEditVariation} onClose={handleEditVariationClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit Product Variation</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} p={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Retail Price"
                                name="retailPrice"
                                value={variationDetails.retailPrice}
                                onChange={handleVariationChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Sale Price"
                                name="salePrice"
                                value={variationDetails.salePrice}
                                onChange={handleVariationChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Stock Quantity"
                                name="stockQuantity"
                                value={variationDetails.stockQuantity}
                                onChange={handleVariationChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label>Stock Available:</label>
                            <input
                                type="checkbox"
                                name="isStockAvailable"
                                checked={variationDetails.isStockAvailable}
                                onChange={handleVariationChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Picture
                                </Button>
                            </label>
                            {variationDetails.picture && (
                                <img src={variationDetails.picture} alt="Uploaded" style={{ marginTop: '10px', maxWidth: '100%' }} />
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditVariationClose} color="secondary">Cancel</Button>
                    <Button onClick={handleEditVariationSubmit} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ProductTable;
