import * as React from 'react';
import { Subject, Textarea } from '../components/MessageBox';
import AlignItemsList from '../components/Inbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useState } from 'react';
import Contacts from '../components/DropdownContacts';
import { DOMParser } from 'xmldom';
const apiPort = process.env.REACT_APP_API_PORT;

function Messages() {
    let [composeMessage, setComposeMessage] = useState(false);

    function toggleNewMessage() {
        setComposeMessage(!composeMessage);
    }

    let [subject, setSubject] = useState('');
    let [message, setMessage] = useState('');
    const [messageIds, setMessageIds] = useState([]);
    const [messageContents, setMessageContents] = useState({});
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState('');
    let [loading, setLoading] = useState(true);

    function handleSubjectChange(e) {
        setSubject(e.target.value);
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    function handleContactChange(e) {
        console.log("selected contact", e.target.value);
        setSelectedContact(e.target.value);
    }

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

    function parseMessageIds(document) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(document, "text/xml");
        let messageList = xmlDoc.getElementsByTagName("message");
        let tempMessageIds = [];
        // console.log('messageList:', messageList);

        for (let i = 0; i < messageList.length; i++) {
            const message = messageList[i];
            const messageId = message.getAttribute("id");
            tempMessageIds.push({ id: messageId });
            // console.log('messageId:', messageId);
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


    function retrieveMessageIds() {
        fetch(`http://localhost:${apiPort}/api/retrieve_message_ids`)
            .then(response => response.text())
            .then(data => {
                // console.log("messageIds", data);
                data = parseMessageIds(data);
                // console.log("parsed messageIds", data);
                setMessageIds(data.ids);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    React.useEffect(() => {
        // wait for retrieveMessageIds to finish
        retrieveMessageIds();
    }, [messageIds]);

    React.useEffect(() => {
        const fetchMessages = async () => {
            if (messageIds.length > 0) {
                for (let i = 0; i < messageIds.length; i++) {
                    const msgID = messageIds[i].id;
                    try {
                        const response = await fetch(`http://localhost:${apiPort}/api/get_message_contents?messageId=${msgID}`);

                        let data = await response.text();
                        // console.log("data", data);
                        data = parseMessages(data);
                        console.log("message", data[0]);
                        setMessageContents(prevState => ({
                            ...prevState,
                            [msgID]: data[0]
                        }));

                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
                setLoading(false);
            }
        };

        fetchMessages();
    }, [messageIds]);

    React.useEffect(() => {
        fetch(`http://localhost:${apiPort}/api/get_contact_list`)
            .then(response => response.text())
            .then(data => {
                data = parseContacts(data);
                // console.log("contacts", data.peers);
                setContacts(data.peers);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);


    function displayMessages() {
        let messagesArray = [];

        for (let i = 0; i < messageIds.length; i++) {
            const msgID = messageIds[i].id;
            const message = messageContents[msgID];
            messagesArray.push(message);
        }
        if (messagesArray.length > 0) {
            return <AlignItemsList items={messagesArray} />
        }
        else {
            return <div>No messages</div>
        }
    }

    function sendMessage() {
        fetch(`http://localhost:${apiPort}/api/send_message?hash=${selectedContact}&subject=${subject}&message=${message}`, {
            method: 'POST'
        })
            .then(response => {
                response.text()
                if (response.status === 200) {
                    console.log('Success:', response);
                    // display popup message
                    alert("Your message has been sent by the P2P birbs <3")

                    //reset form
                    setSubject('');
                    setMessage('');
                    setSelectedContact('');
                }
            })
            .then(data => {
                console.log('Success:', data);
                setComposeMessage(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div>

            <h1>Messages</h1>
            <Button color='secondary' sx={{ marginBottom: "5%" }} onClick={toggleNewMessage} > <AddCircleIcon /> Compose Message</Button>

            <div className='inbox'>
                {/* <div style={{width: "50%"}}> */}

                {!loading && displayMessages()}
                {loading && <div style={{ display: "flex", flexDirection: "column", margin: "auto", justifyContent: "space-evenly" }}>No messages</div>}
                {/* </div> */}

                {/* <Button variant="contained" color='secondary' size='large' sx={{ float:'right', marginRight: '10%' }} onClick={getMessages}>Refresh</Button> */}
                {composeMessage &&
                    <div style={{ width: "50%" }}>
                        <div className='message-box'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Contacts options={contacts} selectedValue={selectedContact} onChange={handleContactChange} name={"Choose contact"} />
                                {composeMessage && <Button color='secondary' onClick={toggleNewMessage} ><CloseIcon /></Button>}
                            </div>

                            <Subject placeholder='Subject' value={subject} onChange={handleSubjectChange} />
                            <Textarea placeholder='Type your message here...' value={message} onChange={handleMessageChange} />
                            <Button variant="contained" color='secondary' size='large' sx={{ float: 'right', marginRight: '10%' }} onClick={sendMessage}>Send</Button>
                        </div>
                    </div>}
            </div>
        </div>
    );
}

export default Messages;