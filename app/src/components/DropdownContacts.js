import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: "10px",
  },
  'label': {
    color: 'white',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: "transparent",
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },

  },
//   change the icon color
    '& .MuiSelect-icon': {
        color: '#E0E3E7',
    },
  '& .MuiOutlinedInput-input': {
    'label': {
        color: 'white',
    },
    },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    color: '#E0E3E7',
    marginLeft: "13px",
}));


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
            <FormControl fullWidth variant='standard'>
                <StyledInputLabel >Choose contact</StyledInputLabel>
                <Select
                    // labelId="demo-customized-select-label"
                    // id="demo-customized-select"
                    value={selectedValue}
                    // label="Contact"
                    input={<BootstrapInput />}
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