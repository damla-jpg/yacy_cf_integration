import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Contacts({ options, selectedValue, onChange }) {
    const handleChange = (event) => {
        onChange(event);
      };

    const style = {
        width: '90%', 

        color: 'white',
    }

    return (
        <Box sx={style}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose contact</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    label="Contact"
                    onChange={handleChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option.hash} value={option.hash}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}