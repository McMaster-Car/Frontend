import React, { Fragment, useState, useEffect } from 'react';
import { Box, TextField, Autocomplete, IconButton, Popover, Typography, Button, InputLabel } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';

const Filter = ({ uniqueAttributes, selectedFilters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(selectedFilters);

    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState('');

    const handleInfoClick = (event, info) => {
        setAnchorEl(event.currentTarget);
        setPopoverContent(info);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setPopoverContent('');
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        setLocalFilters(selectedFilters);
    }, [selectedFilters]);

    const handleAutocompleteChange = (attrId, attrValues) => (event, value) => {
        const updatedFilters = { ...localFilters };

        if (value === null) {
            delete updatedFilters[attrId];
        } else {
            updatedFilters[attrId] = value;
        }

        setLocalFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleClearAll = () => {
        setLocalFilters({});
        onFilterChange({});
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mx: 2
                }}>
                <Typography variant="h6" gutterBottom>
                    Filters
                </Typography>
                <Button
                    variant="text"
                    color="secondary"
                    onClick={handleClearAll}
                    sx={{ ml: 2 }}
                >
                    Clear All
                </Button>
            </Box>
            {uniqueAttributes.length > 0 ? (
                <Fragment>
                    {uniqueAttributes.map(attr => (
                        <Box key={attr.id} sx={{ m: 2 }}>
                            <Box sx={{
                                display:'flex',
                                flexDirection : 'row' , 
                                justifyContent:'space-between',
                                mb:1
                            }}>
                               <Typography mt={1} variant="body2">
                                {attr.name}
                               </Typography>
                                <IconButton
                                    onClick={(event) => handleInfoClick(event, attr.info)}
                                    aria-describedby={id}
                                >
                                    <InfoOutlinedIcon sx={{ fontSize: '18px' }} />
                                </IconButton>
                            </Box>
                            <Autocomplete
                                options={attr.values}
                                getOptionLabel={(option) => option}
                                value={localFilters[attr.id] || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={attr.name}
                                        variant="outlined"
                                        sx={{ fontSize: '10px' }}
                                    />
                                )}
                                onChange={handleAutocompleteChange(attr.id, attr.values)}
                                sx={{ fontSize: '10px' }}
                            />

                        </Box>
                    ))}
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box px={2} py={1}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon sx={{ fontSize: '18px' }} />
                                </IconButton>
                            </Box>
                            <Typography variant="body2">{popoverContent}</Typography>

                        </Box>
                    </Popover>
                </Fragment>
            ) : (
                <Typography sx={{ textAlign: 'center' }}>
                    No Filters Found
                </Typography>
            )}
        </Box>

    );
};

export default Filter;
