import { Fragment, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Fade, Grid, Modal } from '@mui/material';
import AddNewValueModal from './AddNewValueModal';
import Tooltip from '@mui/material/Tooltip';

const AttributeTable = ({ Attributes }) => {

  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState(null)
  const [openView, setOpenView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productIdToDelete, setProductIdToDelete] = useState('');



  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name Of Attribute',
        size: 200,
      },
      {
        accessorKey: 'values',
        header: 'Values',
        size: 600,
      },

      {
        accessorKey: 'Actions',
        header: 'Actions',
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{display:'flex' , flexDirection : 'row' , justifyContent : 'center'}} >
            {/* <VisibilityIcon
              sx={{
                cursor: 'pointer',
                mr: 1.5
              }}
              onClick={() => viewProduct(row.original)} color='secondary' /> */}
            <Tooltip title="Add New Value">
              <EditIcon
                sx={{
                  cursor: 'pointer',
                  mr: 1.5
                }}
                onClick={() => EditProduct(row.original)} color='primary' />
            </Tooltip>
            {/* <DeleteIcon
              sx={{
                cursor: 'pointer'
              }}
              onClick={() => handleDeleteOpen(row.original.Id)} color='error' /> */}
          </Box>
        ),
      },
    ],
    [],
  );

  const EditProduct = (product) => {
    setEditName(product.name)
    handleEditOpen()
  };

  const data = useMemo(() => {
    return Attributes.map(attribute => {
      const valuesLength = attribute.values.length;

      // Check if there are more than 30 values
      if (valuesLength > 30) {
        // Get the first 30 values
        const first30Values = attribute.values.slice(0, 30);
        // Join these values into a single string separated by commas
        const first30ValuesString = first30Values.join(', ');
        // Calculate the number of remaining values
        const remainingItemsCount = valuesLength - 30;

        // Construct the final string
        const formattedValues = `${first30ValuesString}..${remainingItemsCount} more items`;

        return {
          'Id': attribute._id,
          'name': attribute.name,
          'values': formattedValues
        };
      } else {
        // If there are 30 or fewer values, join them directly
        const valuesString = attribute.values.join(', ');

        return {
          'Id': attribute._id,
          'name': attribute.name,
          'values': valuesString
        };
      }
    });
  }, [Attributes]);


  const table = useMaterialReactTable({
    columns,
    data,
  });




  return (
    <Fragment>
      <MaterialReactTable table={table} />
      <AddNewValueModal
        open={openEdit}
        handleClose={handleEditClose}
        Name={editName}
      />
    </Fragment>);
};

export default AttributeTable;
