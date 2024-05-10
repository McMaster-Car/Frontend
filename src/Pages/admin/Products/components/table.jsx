import { Fragment, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Fade, Grid, Modal } from '@mui/material';
import { deleteProduct } from '../../../../Api/Products/deleteProduct';
import ViewProductModal from './ViewProductModal';

const ProductTable = ({ Products }) => {

  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productIdToDelete, setProductIdToDelete] = useState('');


  const columns = useMemo(
    () => [
      {
        accessorKey: 'Bickle Part Numbers',
        header: 'Bickle Part Numbers',
        size: 200,
      },
      {
        accessorKey: 'Country of Origin',
        header: 'Country of Origin',
        size: 60,
      },
      {
        accessorKey: 'Category',
        header: 'Category',
        size: 100,
      },
      {
        accessorKey: 'Sub Category',
        header: 'Sub 2 Cateogory',
        size: 150,
      },
      {
        accessorKey: 'Sub 3 Category',
        header: 'Sub 3 Category',
        size: 250,
      },
      {
        accessorKey: 'Pitch TPI (Diameter)',
        header: 'Pitch TPI (Diameter)',
        size: 100,
      },
      {
        accessorKey: 'Thread (diameter)',
        header: 'Thread (diameter)',
        size: 100,
      },
      {
        accessorKey: 'Equivivalent Diameter',
        header: 'Equivivalent Diameter',
        size: 100,
      },
      {
        accessorKey: 'Thread Pitch',
        header: 'Thread Pitch',
        size: 100,
      },
      {
        accessorKey: 'Pitch',
        header: 'Pitch',
        size: 100,
      },
      {
        accessorKey: 'Body (length)',
        header: 'Body (length)',
        size: 100,
      },
      {
        accessorKey: 'Threading ',
        header: 'Threading ',
        size: 100,
      },
      {
        accessorKey: 'Thread Lg Min',
        header: 'Thread Lg Min',
        size: 100,
      },
      {
        accessorKey: 'Thread Spacing',
        header: 'Thread Spacing',
        size: 100,
      },
      {
        accessorKey: 'Thread Type',
        header: 'Thread Type',
        size: 100,
      },
      {
        accessorKey: 'Head (Width)',
        header: 'Head (Width)',
        size: 100,
      },
      {
        accessorKey: 'Head (Height)',
        header: 'Head (Height)',
        size: 100,
      },
      {
        accessorKey: 'Wrench Size',
        header: 'Wrench Size',
        size: 100,
      },
      {
        accessorKey: 'Tensile (Strength PSI)',
        header: 'Tensile (Strength PSI)',
        size: 150,
      },
      {
        accessorKey: 'Specification Met',
        header: 'Specification Met',
        size: 150,
      },
      {
        accessorKey: 'Package (Quantity)',
        header: 'Package (Quantity)',
        size: 100,
      },
      {
        accessorKey: 'Package Cost(2023)',
        header: 'Package Cost(2023)',
        size: 150,
      },
      {
        accessorKey: 'Description 1',
        header: 'Description 1',
        size: 200,
      },
      {
        accessorKey: 'Description 2',
        header: 'Description 2',
        size: 200,
      },
      {
        accessorKey: 'Thread Direction',
        header: 'Thread Direction',
        size: 150,
      },
      {
        accessorKey: 'Material',
        header: 'Material',
        size: 100,
      },
      {
        accessorKey: 'System Of Measurement',
        header: 'System Of Measurement',
        size: 200,
      },
      {
        accessorKey: 'Fastener Head Type',
        header: 'Fastener Head Type',
        size: 100,
      },
      {
        accessorKey: 'Drive Style',
        header: 'Drive Style',
        size: 150,
      },
      {
        accessorKey: 'Fastener Strength',
        header: 'Fastener Strength',
        size: 150,
      },
      {
        accessorKey: 'Grade ',
        header: 'Grade ',
        size: 100,
      },
      {
        accessorKey: 'Surface',
        header: 'Surface',
        size: 100,
      },
      {
        accessorKey: 'Hardness',
        header: 'Hardness',
        size: 100,
      },
      {
        accessorKey: 'MFG Part 1 Number',
        header: 'MFG Part 1 Number',
        size: 150,
      },
      {
        accessorKey: 'Thread Fit',
        header: 'Thread Fit',
        size: 20,
      },
      {
        accessorKey: 'Actions',
        header: 'Actions',
        size: 200,
        Cell: ({ row }) => (
          <div>
            <Button onClick={() => viewProduct(row.original)} sx={{ mr: 2 }}><VisibilityIcon color='secondary' /></Button>
            {/* <button onClick={() => editProduct(row.original)}>Edit</button> */}
            <Button onClick={() => handleDeleteOpen(row.original.Id)} > <DeleteIcon color='error' /></Button>
          </div>
        ),
      },
    ],
    [],
  );


  const viewProduct = (product) => {
    setSelectedProduct(product);
    setOpenView(true);
  };
  // const viewProduct = (product) => {
  //   console.log(product);
  // };

  const editProduct = (product) => {
    console.log(product);
  };

  const handleDeleteOpen = (productId) => {
    setOpen(true);
    setProductIdToDelete(productId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewClose = () => {
    setOpenView(false);
  };




  const data = useMemo(() => {
    return Products.map(product => ({
      'Id': product._id,
      'Bickle Part Numbers': product['Bickle Part Numbers'],
      'Country of Origin': product['Country of Origin'] || 'N/A',
      'Category': product['Category'] || 'N/A', // Handle missing address
      'Sub Category': product['Sub Category'] || 'N/A', // Handle missing contact_no
      'Sub 2 Cateogory': product['Sub 2 Cateogory'] || 'N/A',
      'Sub 3 Category': product['Sub 3 Category'] || 'N/A',
      'Pitch TPI (Diameter)': product['Pitch TPI (Diameter)'] || 'N/A',
      'Thread (diameter)': product['Thread (diameter)'] || 'N/A',
      'Equivivalent Diameter': product['Equivivalent Diameter'] || 'N/A',
      'Thread Pitch': product['Thread Pitch'] || 'N/A',
      'Pitch': product['Pitch'] || 'N/A',
      'Body (length)': product['Body (length)'] || 'N/A',
      'Threading ': product['Threading '] || 'N/A',
      'Thread Lg Min': product['Thread Lg Min'] || 'N/A',
      'Thread Spacing': product['Thread Spacing'] || 'N/A',
      'Thread Type': product['Thread Type'] || 'N/A',
      'Head (Width)': product['Head (Width)'] || 'N/A',
      'Head (Height)': product['Head (Height)'] || 'N/A',
      'Wrench Size': product['Wrench Size'] || 'N/A',
      'Tensile (Strength PSI)': product['Tensile (Strength PSI)'] || 'N/A',
      'Specification Met': product['Specification Met'] || 'N/A',
      'Package (Quantity)': product['Package (Quantity)'] || 'N/A',
      'Package Cost(2023)': product[' Package Cost(2023) '] || 'N/A',
      'Description 1': product['Description pt']['1'] || 'N/A',
      'Description 2': product['Description pt']['2'] || 'N/A',
      'Thread Direction': product['Thread Direction'] || 'N/A',
      'Material': product['Material'] || 'N/A',
      'System Of Measurement': product['System Of Measurement'] || 'N/A',
      'Fastener Head Type': product['Fastener   Head  Type'] || 'N/A',
      'Drive Style': product['Drive Style'] || 'N/A',
      'Fastener Strength': product['Fastener Strength'] || 'N/A',
      'Grade ': product['Grade '] || 'N/A',
      'Surface': product['Surface'] || 'N/A',
      'Hardness': product['Hardness'] || 'N/A',
      'MFG Part 1 Number': product['MFG Part 1 Number'] || 'N/A',
      'Thread Fit': product['Thread Fit'] || 'N/A',

    }));
  }, [Products]);

  const table = useMaterialReactTable({
    columns,
    data,
  });

  const handleDeleteProduct = async () => {
    const res = await deleteProduct(productIdToDelete)
    console.log(res);
    alert(res.message)
    setOpen(false);

  }


  return (
    <Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={{
            backgroundColor: 'whitesmoke',
            position: 'absolute', left: '25%'
            , top: '35%',
            paddingX: 4,
            paddingY: 3,
            border: 1,
            borderRadius: 5,
            borderColor: 'whitesmoke',
            boxShadow: 50
          }}>
            <h2 id="transition-modal-title">Are you sure you want to delete this product?</h2>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}>

              <Button onClick={handleClose}>Cancel</Button>
              <Button sx={{
                backgroundColor: '#178582',
                border: '1 solid #178582', borderRadius: 2,
                color: '#fff',
                ml: 2,
                "&:hover": {
                  color: '#000',
                  backgroundColor: '#0da39f'

                }
              }} onClick={() => handleDeleteProduct()}>Confirm</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <ViewProductModal
        openView={openView}
        handleViewClose={handleViewClose}
        product={selectedProduct}
      />
      <MaterialReactTable table={table} />
    </Fragment>);
};

export default ProductTable;
