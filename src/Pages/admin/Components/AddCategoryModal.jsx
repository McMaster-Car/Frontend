import React, { useState } from 'react';
import { Modal, Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { addCategory } from '../../../Api/Category/addCategory';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../../store/Categories/categorySlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddCategoryModal({ open, onClose, categories }) {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState(null);

  const dispatch = useDispatch()

  const handleSave = async () => {
    console.log('Name:', name);
    console.log('Parent Category:', parentCategory);
    const data = {
        name : name,
        parentCategory : parentCategory
    }
    const res = await addCategory(data)
    if(res.success) {
        alert('Category Added')
    }
    else{
        alert('Unable to add Category')
    }



    dispatch(fetchCategories())
    setName('');
    setParentCategory('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <h2>Create Category</h2>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Parent Category</InputLabel>
          <Select
            value={parentCategory}
            label="Parent Category"
            onChange={(e) => setParentCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}

export default AddCategoryModal;
