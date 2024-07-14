import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../store/products/productsSlice';
const FileUpload_URL = import.meta.env.VITE_File_Upload || 'http://localhost:5001/api/products/upload';

const Input = styled('input')({
    display: 'none',
});

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [errorText, setErrorText] = useState("File should be CSV or Excel");


    const dispatch = useDispatch()

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const validFormats = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

        if (selectedFile && validFormats.includes(selectedFile.type)) {
            setFile(selectedFile);
            setSnackbarOpen(true);
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post(`${FileUpload_URL}`, formData)
                .then(() => {
                    setSuccessSnackbarOpen(true);
                    dispatch(fetchProducts());

                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                    setErrorText('Error uploading file')
                    setTimeout(() => {
                        setErrorSnackbarOpen(true);
                    }, 2000);
                })
                .finally(() => {
                    setSnackbarOpen(false);
                });
        } else {
            setErrorSnackbarOpen(true);
        }
    };

    return (
        <div>
            <label htmlFor="file-upload">
                <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                />
                <Button variant="contained" component="span">
                    Upload File
                </Button>
            </label>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="warning" sx={{ width: '100%' }}>
                    File will be uploaded shortly...
                </Alert>
            </Snackbar>
            <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSuccessSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSuccessSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    File uploaded successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setErrorSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setErrorSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {errorText}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FileUpload;
