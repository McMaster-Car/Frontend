import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { editCategory } from '../../../../Api/Category/editCategory';
import { useDispatch } from 'react-redux';
import { fetchAttributes } from '../../../../store/Attributes/attributeSlice';
import { infoAttribute } from '../../../../Api/Attribute/addInfo';

const AddInfo = ({ open, handleClose, data }) => {

    const [info, setInfo] = useState("")

    const dispatch = useDispatch()

    const handleSave = async () => {

        const updatedData = {
            name: data.name,
            info: info
        }

        const res = await infoAttribute(updatedData)

        if (res.success) {
            dispatch(fetchAttributes())
            alert("Info Added Successfully")
        }
        else {
            alert("Unable to Add Info")
        }

        setInfo("")

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
                    Add Info
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    my: 2
                }}>
                    <Button onClick={handleSave} variant="contained" color="secondary">
                        Add Info
                    </Button>
                </Box>

                <TextField
                    style={styles.field}
                    label="Enter Info"
                    fullWidth
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                />


            </Box>
        </Modal>
    );
};

export default AddInfo;
