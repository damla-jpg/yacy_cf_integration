import * as React from 'react';
import {Subject, Textarea} from './components/MessageBox';
import AlignItemsList from './components/Inbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useState } from 'react';
import { DOMParser } from 'xmldom';
import Contacts from './components/DropdownContacts';
 

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


    let [status, setStatus] = useState(false);
    let [error, setError] = useState(null);
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


    function retrieveMessageIds() {
        fetch('http://localhost:3001/api/retrieve_message_ids')
        .then(response => response.json())
        .then(data => {
            setMessageIds(data.ids);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


    React.useEffect(() => {
        // wait for retrieveMessageIds to finish
        retrieveMessageIds();
    }, []);

    React.useEffect(() => {
        const fetchMessages = async () => {
            if (messageIds.length > 0) {
                for (let i = 0; i < messageIds.length; i++) {
                    const msgID = messageIds[i].id;
                    try {
                        const response = await fetch(`http://localhost:3001/api/get_message_contents?messageId=${msgID}`);
                        const data = await response.json();
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
        fetch('http://localhost:3001/api/get_contact_list')
        .then(response => response.json())
        .then(data => {
            console.log("contacts", data.peers);
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
            return <AlignItemsList items={messagesArray}/>
        }
        else {
            return <div>No messages</div>
        }
    }

    function sendMessage() {
        fetch(`http://localhost:3001/api/send_message?hash=${selectedContact}&subject=${subject}&message=${message}`, {
            method: 'POST'
        })
        .then(response => {
            response.text()
            if (response.status === 200) {
                console.log('Success:', response);
                setStatus(true);
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
        
            <div className='inbox'>
                {/* <div style={{width: "50%"}}> */}
                    <Button color='secondary' onClick={toggleNewMessage} > <AddCircleIcon /> Compose Message</Button>
                    {!loading && displayMessages()}
                {/* </div> */}
                
                {/* <Button variant="contained" color='secondary' size='large' sx={{ float:'right', marginRight: '10%' }} onClick={getMessages}>Refresh</Button> */}
                {composeMessage && 
                <div style={{width: "50%"}}>
                    <div className='message-box'>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Contacts options={contacts} selectedValue={selectedContact} onChange={handleContactChange} />
                            {composeMessage && <Button color='secondary' onClick={toggleNewMessage} ><CloseIcon /></Button>}
                        </div>
                        
                        <Subject placeholder='Subject' value={subject} onChange={handleSubjectChange} />
                        <Textarea placeholder='Type your message here...' value={message} onChange={handleMessageChange}/>
                        <Button variant="contained" color='secondary' size='large' sx={{ float:'right', marginRight: '10%' }} onClick={sendMessage}>Send</Button>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Messages;