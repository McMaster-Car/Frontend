import React, { useMemo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CssBaseline, Drawer, List, Divider, Badge, IconButton } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Filter from '../Home/Components/filter';
import './tableStyles.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

const ProductDetail = () => {
    const location = useLocation();
    const { Backendproduct } = location.state || {};

    const [uniqueFilterAttributes, setUniqueFilterAttributes] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});

    const [selectedVariation, setSelectedVariation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [cartCount, setCartCount] = useState(0);


    const navigate = useNavigate()

    const handleOpenVariationPage = (variation) => {
        navigate("/variation-details", { state: { variation } });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVariation(null);
    };


    if (!Backendproduct) {
        return <Typography>No product data available</Typography>;
    }

    const { name, description, variations } = Backendproduct;

    // Function to get unique attributes from variations
    const getUniqueAttributes = (variations) => {
        const attributesMap = {};

        variations.forEach(variation => {
            variation.attributes.forEach(attribute => {
                if (!attributesMap[attribute.attributeId]) {
                    attributesMap[attribute.attributeId] = {
                        id: attribute.attributeId,
                        name: attribute.attributeName,
                        values: new Set(),
                        info: attribute.info,

                    };
                }
                attributesMap[attribute.attributeId].values.add(attribute.value.trim());
            });
        });

        const uniqueAttributesArray = Object.values(attributesMap).map(attribute => ({
            id: attribute.id,
            name: attribute.name,
            values: Array.from(attribute.values),
            info: attribute.info,

        }));

        return uniqueAttributesArray;
    };

    // Set unique filter attributes when variations change
    useEffect(() => {
        setUniqueFilterAttributes(getUniqueAttributes(variations));


    }, [variations]);


    useEffect(() => {
        // Check if the item is already in the cart
        const orderCart = JSON.parse(localStorage.getItem('orderCart')) || [];
        // Update cart count
        setCartCount(orderCart.length);
    }, [])

    // Handle filter change
    const handleFilterChange = (updatedFilters) => {
        setSelectedFilters(updatedFilters);
    };

    // Filter variations based on selected filters
    const filteredVariations = useMemo(() => {
        if (Object.keys(selectedFilters).length === 0) {
            return variations;
        }

        return variations.filter(variation =>
            Object.entries(selectedFilters).every(([key, value]) =>
                variation.attributes.some(attr => attr.attributeId === key && attr.value.trim() === value)
            )
        );
    }, [variations, selectedFilters]);

    // Update unique filter attributes when filtered variations change
    useEffect(() => {
        setUniqueFilterAttributes(getUniqueAttributes(filteredVariations));
    }, [filteredVariations]);

    // Define columns based on unique attributes and additional fields
    const uniqueAttributes = useMemo(() => {
        return [...new Set(filteredVariations.flatMap(variation => variation.attributes.map(attr => attr.attributeName)))];
    }, [filteredVariations]);

    const columns = useMemo(
        () => [
            ...uniqueAttributes.map(attrName => ({
                accessorKey: attrName,
                header: attrName,
                size: 100,
                Cell: ({ cell }) => (
                    <div className="custom-cell">{cell.getValue()}</div>
                ),
            })),
            {
                accessorKey: 'retailPrice',
                header: 'Price',
                size: 100,
                Cell: ({ cell }) => (
                    <div className="custom-cell">{cell.getValue()}</div>
                ),
            },
            {
                accessorKey: 'picture',
                header: 'Picture',
                size: 150,
                Cell: ({ cell }) => (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <img
                            src={cell.getValue()}
                            alt={name}
                            className="custom-img"
                        />
                    </Box>
                ),
            },
            {
                accessorKey: 'addToCart',
                header: 'Action',
                size: 150,
                Cell: ({ row }) => (
                    <>

                        <Box sx={{
                            p: 1
                        }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                    handleOpenVariationPage(row.original)
                                }
                            >
                                View Variation
                            </Button>
                        </Box>
                    </>
                ),
            },
        ],
        [uniqueAttributes, name]
    );

    const data = useMemo(() => filteredVariations.map(variation => {
        const formattedAttributes = (variation.attributes || []).reduce((acc, attr) => {
            acc[attr.attributeName] = attr.value;
            return acc;
        }, {});
        return {
            ...formattedAttributes,
            retailPrice: variation.retailPrice,
            picture: variation.picture,
            addToCart: variation._id,
        };
    }), [filteredVariations]);

    const table = useMaterialReactTable({
        columns,
        data,
    });

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Typography
                        textAlign="center"
                        sx={{
                            my: 2,
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#178582',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#125b61'
                            }
                        }}
                        onClick={() => { window.location.href = '/' }}
                    >
                        BMI SUPPLY
                    </Typography>
                    <Divider />

                    <Box sx={{
                        display:'flex',
                        flexDirection : 'row',
                        justifyContent : 'flex-end',
                        mr:3,
                        my:1
                    }}>
                        
                        <IconButton onClick={() => navigate('/cart')} color="primary">
                            <Badge badgeContent={cartCount} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <Divider />
                    <List>
                        <Filter
                            uniqueAttributes={uniqueFilterAttributes}
                            selectedFilters={selectedFilters}
                            onFilterChange={handleFilterChange}
                        />
                    </List>
                    <Divider />
                </Drawer>
                <Box sx={{ p: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant="h5" component="div" gutterBottom>
                            {name}
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {description}
                    </Typography>
                    <Box sx={{
                        my: 2
                    }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold" color="black">
                            Variations:
                        </Typography>
                    </Box>
                    <div className="table-container">
                        <MaterialReactTable
                            table={table} />
                    </div>
                </Box>
            </Box>

        </>
    );
};

export default ProductDetail;


// in this code of mine add a feature near to add to cart a button to view variation that give complete details of that specific variation with the product name and description and picture in the center and there should be option to add to cart or buy now in that variation page