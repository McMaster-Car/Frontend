import { Fragment, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Fade, Grid, Modal } from '@mui/material';

const CategoryTable = ({ Categories }) => {

  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productIdToDelete, setProductIdToDelete] = useState('');


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Category Name',
        size: 250,
      },
      {
        accessorKey: 'Parent Category',
        header: 'Parent Category',
        size: 250,
      }
    ],
    [],
  );

  const data = useMemo(() => {
    return Categories.map(cat => {

      return {
        'Id': cat._id,
        'name': cat.name,
        'Parent Category': cat.parentCategory ? cat.parentCategory.name : 'N/A'
      };
    });
  }, [Categories]);

  const table = useMaterialReactTable({
    columns,
    data,
  });




  return (
    <Fragment>
      <MaterialReactTable table={table}  />
    </Fragment>);
};

export default CategoryTable;
