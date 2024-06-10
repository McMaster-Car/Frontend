import { Fragment, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Fade, Grid, Modal } from '@mui/material';

const ProductTable = ({ products }) => {

    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [productIdToDelete, setProductIdToDelete] = useState('');

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
                accessorKey: 'attributes',
                header: 'Attributes',
                size: 250,
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
                Cell: ({ cell }) => <img src={cell.getValue()} alt="Product" style={{ width: '100px' }} />,
            },
            // {
            //     accessorKey: 'Actions',
            //     header: 'Actions',
            //     size: 100,
            //     Cell: ({ row }) => (
            //         <div>
            //             <VisibilityIcon
            //                 sx={{
            //                     cursor: 'pointer',
            //                     mr: 1.5
            //                 }}
            //                 onClick={() => viewProduct(row.original)} color='secondary' />
            //             <DeleteIcon
            //                 sx={{
            //                     cursor: 'pointer'
            //                 }}
            //                 onClick={() => handleDeleteOpen(row.original.id)} color='error' />
            //         </div>
            //     ),
            // },
        ],
        [],
    );

    const data = useMemo(() => {
        return products.map(product => {
            // Combine attributes into a single string
            const attributesString = product.variation.attributes
                .map(attr => `${attr.attributeName}: ${attr.value}`)
                .join(', ');

            // Combine category names into a single string
            const categoriesString = product.categories
                .map(cat => cat.name)
                .join(', ');

            return {
                'id': product._id,
                'name': product.name,
                'description': product.description,
                'attributes': attributesString,
                'categories': categoriesString,
                'retailPrice': product.variation.retailPrice,
                'salePrice': product.variation.salePrice,
                'stockQuantity': product.variation.stockQuantity,
                'isStockAvailable': product.variation.isStockAvailable ? 'Yes' : 'No',
                'picture': product.variation.picture
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

    const handleDeleteOpen = (id) => {
        setProductIdToDelete(id);
        setOpen(true);
    };

    return (
        <Fragment>
            <MaterialReactTable table={table} />
        </Fragment>);
};

export default ProductTable;
