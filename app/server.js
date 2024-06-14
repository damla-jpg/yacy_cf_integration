// Setup a express server
const express = require('express');
const cors = require('cors');

const http = require('http');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000', // allow requests from this origin
}));

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
async function retrieveMessages() {
    try {
        const response = await axios.get('http://localhost:8090/Messages_p.html');
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching messages:', error.message);
        throw error;
    }
}

async function getPeers() {
    try {
        const response = await axios.get('http://localhost:8090/yacy/seedlist.json');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching peers:', error.message);
        throw error;
    }
}

async function getPeerProfile() {
    try {
        const response = await axios.get('http://localhost:8090/Network.xml');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching peer profile:', error.message);
        throw error;
    }
}

async function getSearchResults(query, startRecord = 1){
    try {
        const response = await axios.get(`http://localhost:8090/yacysearch.json?query=${query}&resource=global&urlmaskfilter=.*&prefermaskfilter=&nav=all&startRecord=${startRecord}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching search results:', error.message);
        throw error;
    }
}

app.get('/search', (req, res) => {
    const query = req.query.query;
    const startRecord = req.query.startRecord;
    getSearchResults(query, startRecord).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

app.get('/profile', (req, res) => {
    getPeerProfile().then((data) => {
        res.status(200).type('text/xml').send(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

app.get('/getPeers', (req, res) => {
    getPeers().then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});


app.get('/api/fetch_profile', (req, res) => {
    fetchProfileData().then((data) => {
        res.json(data);
        console.log('Data sent:', data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

app.get('/api/retrieve_messages', (req, res) => {
    retrieveMessages().then((data) => {
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