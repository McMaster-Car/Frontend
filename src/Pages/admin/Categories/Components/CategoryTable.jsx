import { Fragment, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Box, Button, Fade, Grid, Modal, Tooltip } from '@mui/material';
import EditCategoryModal from './EditCategoryModal';
import { fetchCategories } from '../../../../store/Categories/categorySlice';
import Axios from '../../../../Api/Connection/Connect';
import { useDispatch } from 'react-redux';

const CategoryTable = ({ Categories }) => {

  const [open, setOpen] = useState(false);
  const [editableData, setEditableData] = useState('');

  const dispatch = useDispatch()

  const handleEditOpen = ()=>{
    setOpen(true)
  }

  const handleEditClose = ()=> {
    setOpen(false)
  }

  const EditCategory = (category) => {
    setEditableData(category)
    handleEditOpen()
  };

  const handleDelete = async ({ id }) => {
    try {
      const res = await Axios.delete(`/categories/delete-category/${id}`)
      if (res.data.success) {
        dispatch(fetchCategories()).then(() => {
          alert(res.data.message)
        }).catch((err) => {
          console.log(err);
        })
      }
      alert(res.data.message)

    } catch (error) {
      console.log(error);

    }


  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Image',
        header: 'Image',
        size: 200,
        Cell: ({ cell }) => <img src={cell.getValue()} alt="Category Image" style={{ width: '100px' }} />,

      },

      {
        accessorKey: 'name',
        header: 'Category Name',
        size: 250,
      },
      
     
      {
        accessorKey: 'Parent Category',
        header: 'Parent Category',
        size: 250,
      },
     
      {
        accessorKey: 'Actions',
        header: 'Actions',
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{display:'flex' , flexDirection : 'row' , justifyContent : 'center'}} >
            
            <Tooltip title="Edit">
              <EditIcon
                sx={{
                  cursor: 'pointer',
                  mr: 1.5
                }}
                onClick={() => EditCategory(row.original)} 
                color='primary' />
            </Tooltip>
            <DeleteIcon
              sx={{
                cursor: 'pointer'
              }}
              onClick={() => handleDelete({
                id: row.original.Id
              })} color='error' />
            
          </Box>
        ),
      },
    
     
    ],
    [],
  );

  const data = useMemo(() => {
    return Categories.map(cat => {

      return {
        'Id': cat._id,
        'name': cat.name,
        'Image': cat.image ? cat.image : 'N/A',
        'Parent Category': cat.parentCategory ? cat.parentCategory.name : 'N/A',
        
        
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
      <EditCategoryModal
        open={open}
        handleClose={handleEditClose}
        data={editableData}
      />
    </Fragment>);
};

export default CategoryTable;
