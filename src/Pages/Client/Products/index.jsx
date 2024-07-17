import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

const ProductDetail = () => {
    const location = useLocation();
    const { product } = location.state || {};

    if (!product) {
        return <Typography>No product data available</Typography>;
    }

    const { name, description, variation } = product;
    const { retailPrice, attributes, picture } = variation;

    // Filter out unwanted data
    const filteredAttributes = attributes.filter(attr => attr.value && attr.value.trim());

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h5" component="div" gutterBottom>
                    {name}
                </Typography>
                <Button variant="contained" color="primary">
                    Add to Cart
                </Button>
                {/* <Typography variant="p" component="div" gutterBottom>
                    Price: {retailPrice}
                </Typography> */}
            </Box>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                {description}
            </Typography>
            {/* <Button variant="contained" color="primary">
                Add to Cart
            </Button> */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <img
                    src={picture}
                    alt={name}
                    style={{
                        width: '50%',
                        height: 'auto',
                        marginBottom: '16px',

                    }} />

            </Box>
            <Typography
                variant="p"
                component="div"
                textAlign="center"
                gutterBottom>
                Price: {retailPrice}
            </Typography>


            <TableContainer component={Paper} sx={{ my: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                textAlign: "center",
                                fontWeight: "bold"
                            }}
                            >Attribute</TableCell>
                            <TableCell sx={{
                                textAlign: "center",
                                fontWeight: "bold"
                            }}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAttributes.map(attr => (
                            <TableRow key={attr.attributeId}>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}
                                >{attr.attributeName}</TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center"
                                    }}
                                >{attr.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </Box>
    );
};

export default ProductDetail;
