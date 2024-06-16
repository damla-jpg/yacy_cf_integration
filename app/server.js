// Setup a express server
const express = require('express');
const cors = require('cors');

const http = require('http');
const axios = require('axios');

// require dom-parser
const { DOMParser } = require('xmldom');

const app = express();
const port = 3001;

var request = require("request")

app.use(cors({
    origin: 'http://localhost:3000', // allow requests from this origin
}));

async function deleteMessage(messageId) {
    try {
        const url = 'http://localhost:8090/Messages_p.html?action=delete&object=' + messageId;
        console.log('url:', url);
        const MY_DIGEST_USERNAME = '';
        const MY_DIGEST_PASSWORD = '';

        return new Promise((resolve, reject) => {
            request.delete(url, {
                auth: {
                    user: MY_DIGEST_USERNAME,
                    pass: MY_DIGEST_PASSWORD,
                    sendImmediately: false
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // console.log(body);
                    resolve(body);
                } else {
                    reject(new Error('Failed to delete message') + error);
                }
            });
        }
        );
    }
    catch (error) {
        console.error('Error deleting message:', error.message);
        throw error;
    }
}

async function sendMessage(hash, subject, message) {

    try {
        const url = `http://localhost:8090/MessageSend_p.html?hash=${hash}&subject=${subject}&message=${message}`;
        console.log('url:', url);
        const MY_DIGEST_USERNAME = '';
        const MY_DIGEST_PASSWORD = '';

        return new Promise((resolve, reject) => {
            request.post(url, {
                auth: {
                    user: MY_DIGEST_USERNAME,
                    pass: MY_DIGEST_PASSWORD,
                    sendImmediately: false
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // console.log(body);
                    resolve(body);
                } else {
                    reject(new Error('Failed to send message') + error);
                }
            });
        }
        );
}
    catch (error) {
        console.error('Error sending message:', error.message);
        throw error;
    }
}

async function getContactList() {
    try {
        // TODO: Remove the username and password from here (DONT HARDCODE IT)
        const url = 'http://localhost:8090/Messages_p.html';
        console.log('url:', url);
        const MY_DIGEST_USERNAME = '';
        const MY_DIGEST_PASSWORD = '';

        return new Promise((resolve, reject) => {
            request.get(url, {
                auth: {
                    user: MY_DIGEST_USERNAME,
                    pass: MY_DIGEST_PASSWORD,
                    sendImmediately: false
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // console.log(body);
                    resolve(body);
                } else {
                    reject(new Error('Failed to retrieve messages') + error);
                }
            });
        });

    }
    catch (error) {
        console.error('Error fetching messages:', error.message);
        throw error;
    }
}



async function getMessageContents(messageId) {
    try {
        // TODO: Remove the username and password from here (DONT HARDCODE IT)
        const url = 'http://localhost:8090/Messages_p.html?action=view&object=' + messageId;
        console.log('url:', url);
        const MY_DIGEST_USERNAME = '';
        const MY_DIGEST_PASSWORD = '';

        return new Promise((resolve, reject) => {
            request.get(url, {
                auth: {
                    user: MY_DIGEST_USERNAME,
                    pass: MY_DIGEST_PASSWORD,
                    sendImmediately: false
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // console.log(body);
                    resolve(body);
                } else {
                    reject(new Error('Failed to retrieve messages') + error);
                }
            });
        });

    }
    catch (error) {
        console.error('Error fetching messages:', error.message);
        throw error;
    }
}


async function retrieveMessages() {
    try {
        // TODO: Remove the username and password from here (DONT HARDCODE IT)
        const url = 'http://localhost:8090/Messages_p.xml';
        const MY_DIGEST_USERNAME = '';
        const MY_DIGEST_PASSWORD = '';

        return new Promise((resolve, reject) => {
            request.get(url, {
                auth: {
                    user: MY_DIGEST_USERNAME,
                    pass: MY_DIGEST_PASSWORD,
                    sendImmediately: false
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // console.log(body);
                    resolve(body);
                } else {
                    reject(new Error('Failed to retrieve messages'));
                }
            });
        });

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

async function getSearchResults(query, startRecord = 1) {
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

function parseMessageIds(document) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(document,"text/xml");
    let messageList = xmlDoc.getElementsByTagName("message");
    let tempMessageIds = [];
    console.log('messageList:', messageList);

    for (let i = 0; i < messageList.length; i++) {
        const message = messageList[i];
        const messageId = message.getAttribute("id");
        tempMessageIds.push({id: messageId});
        console.log('messageId:', messageId);
    }

    const jsonData = {
        ids: tempMessageIds
    };
    return jsonData;
    
}

function parseMessages(document) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(document, 'text/html');

        const message = doc.getElementsByClassName('pairs')[0];
        const messagesArray = [];
                  
        if (message) {
            const from = message.getElementsByTagName('dd')[0].textContent;
            const to = message.getElementsByTagName('dd')[1].textContent;
            const date = message.getElementsByTagName('dd')[2].textContent;
            const subject = message.getElementsByTagName('dd')[3].textContent;
            const message1 = message.getElementsByTagName('dd')[4].textContent;

            messagesArray.push({
                from: from,
                to: to,
                date: date,
                subject: subject,
                message: message1
            });
            
        } else {
            console.error('Select element not found');
        }

        return messagesArray;
        
    } catch (error) {
        console.error('Parsing error:', error);
    }
    
}


app.get('/api/retrieve_message_ids', (req, res) => {
    retrieveMessages().then((data) => {
        const parsedData = parseMessageIds(data);
        res.status(200).json(parsedData);
        console.log('Data sent:', data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

app.get('/api/get_message_contents', (req, res) => {
    const messageId = req.query.messageId;
    getMessageContents(messageId).then((data) => {
        const parsedData = parseMessages(data);
        res.status(200).json(parsedData);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

app.post('/api/send_message', (req, res) => {
    const hash = req.query.hash;
    const subject = req.query.subject;
    const message = req.query.message;
    sendMessage(hash, subject, message).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        console.error('Error sending message:', error);
        res.status(500).json({ error: error.message });
    });
});

function parseContacts(document) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(document, 'text/html');
        const selectElement = doc.getElementById('peers');
        const optionsArray = [];

        if (selectElement) {
            const options = selectElement.getElementsByTagName('option');
            for (let i = 0; i < options.length; i++) {
                // console.log('Option text:', options[i].childNodes[0].nodeValue, 'Value:', options[i].attributes[0].nodeValue);
                optionsArray.push({
                    hash: options[i].attributes[0].nodeValue,
                    name: options[i].childNodes[0].nodeValue
                });
            }
            
        } else {
            console.error('Select element not found');
        }

        const jsonData = {
            peers: optionsArray
        };
        return jsonData;
        
    } catch (error) {
        console.error('Parsing error:', error);
    }
    
}

app.get('/api/get_contact_list', (req, res) => {
    getContactList().then((data) => {
        const parsedData = parseContacts(data);

        res.status(200).json(parsedData);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

app.delete('/api/delete_message', (req, res) => {
    const messageId = req.query.messageId;
    deleteMessage(messageId).then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);