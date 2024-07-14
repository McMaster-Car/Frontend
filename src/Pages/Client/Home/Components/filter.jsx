import React, { Fragment, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Typography, Button } from '@mui/material';

const Filter = ({ uniqueAttributes, selectedFilters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(selectedFilters);

    useEffect(() => {
        setLocalFilters(selectedFilters);
    }, [selectedFilters]);

    const handleAutocompleteChange = (attrId, attrValues) => (event, value) => {
        const updatedFilters = {
            ...localFilters,
            [attrId]: value
        };

        setLocalFilters(updatedFilters);
        onFilterChange(updatedFilters); 

        const index = attrValues.indexOf(value);
      
    };

    const handleClearAll = () => {
        // console.log(selectedFilters);
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
                            <Autocomplete
                                options={attr.values}
                                getOptionLabel={(option) => option}
                                value={localFilters[attr.id] || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={attr.name}
                                        variant="outlined"
                                        sx={{ fontSize: '12px' }}
                                    />
                                )}
                                onChange={handleAutocompleteChange(attr.id, attr.values)}
                            />
                        </Box>
                    ))}
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
