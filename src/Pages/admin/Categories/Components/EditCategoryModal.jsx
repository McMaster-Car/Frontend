import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { editCategory } from '../../../../Api/Category/editCategory';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { uploadFileToCatStorage, uploadFileToStorage } from '../../../../utils/firebaseUtils';
import { fetchCategories } from '../../../../store/Categories/categorySlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const EditCategoryModal = ({ open, handleClose, data }) => {

    const id = data.Id
    
    const [name, setName] = useState(data.name)
    const [image, setImage] = useState(data.image)

    const dispatch = useDispatch()

    useEffect(() => {
        setName(data.name)
        setImage(data.image)
    }, [])

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const downloadURL = await uploadFileToCatStorage(file);
                setImage(downloadURL)
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error if needed
            }
        }
    };



    const handleSave = async () => {

        const data = {
            name: name,
            image: image
        }

        const res = await editCategory(id, data)

        if (res.success) {
            dispatch(fetchCategories())
            alert("Category Updated Successfully")
        }
        else {
            alert("Unable to Update Category")
        }

        setName("")
        setImage("")

        handleClose();
    };

    const styles = {
        modalStyle: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            backgroundColor: 'white',
            border: '2px solid #fff',
            borderRadius: 15,
            boxShadow: 50,
            padding: '16px',
        },
        field: {
            marginBottom: '16px',
        },
        valueItem: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: '8px',
        },
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box style={styles.modalStyle}>
                <Typography id="modal-title" variant="h6" textAlign="center" component="h2">
                    Edit Category
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    my: 2
                }}>
                    <Button onClick={handleSave} variant="contained" color="secondary">
                        Edit Category
                    </Button>
                </Box>

                <Box sx={{
                    my: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Typography>
                        Category Name : {data.name}
                    </Typography>
                    <Typography>
                        Category Image :
                        <img src={data.image} alt="No Image Found" />
                    </Typography>

                </Box>
                <TextField
                    style={styles.field}
                    label="Enter Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                    >
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}

                            type="file"
                            onChange={(e) => handleFileChange(e)}
                        />
                        Upload Picture
                    </Button>
                </label>

              



            </Box>
        </Modal>
    );
};

export default EditCategoryModal;
