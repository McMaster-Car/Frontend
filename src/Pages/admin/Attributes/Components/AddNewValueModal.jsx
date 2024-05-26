import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { addNewValue } from '../../../../Api/Attribute/AddValueToAttribute';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { fetchAttributes } from '../../../../store/Attributes/attributeSlice';

const AddNewValueModal = ({ open, handleClose, Name }) => {
    const [values, setValues] = useState([]);
    const [value, setValue] = useState('');

    const dispatch = useDispatch()

    const handleAddValue = () => {
        if (value.trim()) {
            setValues([...values, value]);
            setValue('');
        }
    };

    const handleRemoveValue = (index) => {
        setValues(values.filter((_, i) => i !== index));
    };

    const handleSave = async () => {

        const data = {
            name: Name,
            value: values
        }


        const res = await addNewValue(data)

        if(res.success){
            dispatch(fetchAttributes())
            alert("Attribute Values Added Successfully")
            

        }
        else{
            alert("Unable to Add Attribute")
        }

        setValues([])
        setValue('')

        handleClose();
    };

    const styles = {
        modalStyle: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
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
                    Add Value to Attribute
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    my: 2
                }}>
                    <Button onClick={handleSave} variant="contained" color="secondary">
                        Add Value To Attribute
                    </Button>
                </Box>
                <TextField
                    style={styles.field}
                    label="Enter New Value"
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {value.trim() && (
                    <Button onClick={handleAddValue} variant="contained">
                        Add New Value
                    </Button>
                )}
                <ul>
                    {values.map((val, index) => (
                        <li key={index} style={styles.valueItem}>
                            {val}
                            <DeleteIcon sx={{
                                cursor: 'pointer'
                            }} color='error' onClick={() => handleRemoveValue(index)} />
                        </li>
                    ))}
                </ul>

            </Box>
        </Modal>
    );
};

export default AddNewValueModal;
