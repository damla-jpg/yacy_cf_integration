import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const SearchBar = styled(TextField)(
    {
    '& label': {
      color: '#E0E3E7',
    },
    '& label.Mui-focused': {
      color: 'secondary',
    },
    '& .MuiInputBase-input': {
      color: "white",
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: 'secondary',
      },
    },
});

export default SearchBar;    