import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';


  // const blue = {
  //   100: '#DAECFF',
  //   200: '#b6daff',
  //   400: '#3399FF',
  //   500: '#007FFF',
  //   600: '#0072E5',
  //   900: '#003A75',
  // };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Subject = styled(TextField)(
    ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? grey[800] : grey[200],
            },
            '&:hover fieldset': {
                borderColor: theme.palette.mode === 'dark' ? grey[700] : grey[300],
            },
            '&.Mui-focused fieldset': {
                borderColor: 'secondary',
            },
        },
        '& .MuiInputBase-input': {
            color: "white",
          },
        '& label': {
            color: '#E0E3E7',
        },
        width: '80%', 
        margin: 'auto',
        
    }),
  );

const Textarea = styled(TextField)(
    ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? grey[800] : grey[200],
                
            },
            '&:hover fieldset': {
                borderColor: theme.palette.mode === 'dark' ? grey[700] : grey[300],
            },
            '&.Mui-focused fieldset': {
                borderColor: 'secondary',
               
            },
        },
        '& .MuiOutlinedInput-input': {
            height: '200px',
            color: 'white',
        },
        '& .MuiInputBase-input': {
            color: "white",
          },
        '& label': {
            color: '#E0E3E7',
            
        },
        width: '80%',
        margin: 'auto',
        
    }),


);

export { Subject, Textarea };
