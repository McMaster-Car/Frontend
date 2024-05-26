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
            //             {/* <button onClick={() => editProduct(row.original)}>Edit</button> */}
            //             <DeleteIcon
            //                 sx={{
            //                     cursor: 'pointer'
            //                 }}
            //                 onClick={() => handleDeleteOpen(row.original.Id)} color='error' />
            //         </div>
            //     ),
            // },
        ],
        [],
    );

    const data = useMemo(() => {
        return products.map(product => {
            // Combine attributes into a single string
            const attributesString = product.attributes
                .map(attr => `${attr.name}: ${attr.value}`)
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
                'categories': categoriesString
            };
        });
    }, [products]);

    const table = useMaterialReactTable({
        columns,
        data,
    });




    return (
        <Fragment>
            <MaterialReactTable table={table} />
        </Fragment>);
};

export default ProductTable;
