import React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const Textarea = styled(TextField)(
    ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: "#E0E3E7",
                
            },
            '&:hover fieldset': {
                borderColor:    "#E0E3E7",
            },
            '&.Mui-focused fieldset': {
                borderColor: 'secondary',
               
            },
        },
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        '& .MuiInputBase-input': {
            color: "white",
          },
        '& label': {
            color: '#E0E3E7',
            
        },
        // width: '100%',
        
    }),


);

export default function UploadButton() {
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        // console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        console.log('FILLLLLEEEEEEEEE:', file);
    };

    const handleUpload = async () => {
        let formData = new FormData();
        formData.append('files', file);
        // add console.log to see if file is being appended to formData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);

        }

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const style = {
        width: '90%',
        margin: 'auto',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
    };

 

    return (
        <div >
            <h1>Upload File</h1>
            <form>
                <div style={style}>

                    <Textarea type="file" onChange={handleChange} />
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleUpload}
                        sx={{ height: '100%', marginLeft: '10px'}}
                    >
                        Upload
                    </Button>

                </div>
                
                
                </form>
        </div>
    );
}