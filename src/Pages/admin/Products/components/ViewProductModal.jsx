import React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

const ViewProductModal = ({ openView, handleViewClose, product }) => {
    const renderKeyValuePairs = () => {
        return Object.keys(product).map((key) => (
            <Grid item xs={4} key={key}>
                <Box sx={{ fontWeight: 'bold' }}>{key}</Box>
                <Box>{product[key]}</Box>
            </Grid>
        ));
    };

    return (
        <Modal
            open={openView}
            onClose={handleViewClose}
            closeAfterTransition
        >
            <Fade in={openView}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: 2,
                        borderRadius: 5,
                        boxShadow: 24,
                        maxHeight: '80vh',
                        width: '80vw',
                        overflowY: 'auto',
                    }}
                >
                    <Box 
                    
                    sx={{
                        display:'flex',
                        flexDirection : 'row',
                        justifyContent:'space-between',
                        width:'100%',
                        mb:3
                    }}>
                        <Typography variant='h5' 
                            sx={{
                                fontWeight:'bold',
                                color:'#178582',
                                }}>
                            Details
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleViewClose}
                            
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Grid container spacing={2}>
                        {renderKeyValuePairs()}
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ViewProductModal;
