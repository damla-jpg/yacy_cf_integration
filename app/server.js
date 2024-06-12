// Setup a express server
const express = require('express');
const cors = require('cors');

const http = require('http');
const axios = require('axios');

const app = express();
const port = 3001;

// Function to make API call
async function fetchProfileData() {
    try {
        const response = await axios.post('http://localhost:8090/yacy/message.html?process=post&myseed=p%7C{Hash=0ZDAw_yFmHxy,Port=8090,PeerType=junior}&subject=p%7CTest&message=p%7CHelloWorld');
        console.log(response.data); // Log the response data
        return response.data; // Return the data if needed
    } catch (error) {
        console.error('Error fetching profile data:', error.message);
        throw error; // Throw the error to handle it elsewhere if needed
    }
}


app.use(cors({
    origin: 'http://localhost:3000', // allow requests from this origin
}));

app.get('/api/fetch_profile', (req, res) => {
    fetchProfileData().then((data) => {
        res.json(data);
        console.log('Data sent:', data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);