import * as React from 'react';
import {Subject, Textarea} from './components/MessageBox';
import AlignItemsList from './components/Inbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useState } from 'react';
 

function Messages() {
    let [newMessage, setNewMessage] = useState(false);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    function toggleNewMessage() {
        setNewMessage(!newMessage);
    }

    let [ipReceiver, setIpReceiver] = useState('');
    let [hashReceiver, setHashReceiver] = useState('');
    let [subject, setSubject] = useState('');
    let [message, setMessage] = useState('');
    let [error, setError] = useState(null);
  
    function sendMessage() {
        // if (hashReceiver === '') {
        //     setError('Please enter a receiver');
        //     return;
        // }

        // if (hashReceiver.length !== 6) {
        //     setError('Receiver hash must be 6 characters long');
        //     return;
        // }


        console.log('hash:', hashReceiver);
        console.log('subject:', subject);
        console.log('message:', message);
        // let hashReceiver = getHashReceiver();

        // try{
        //     fetch('http://localhost:8090/Message_Send_p.html?hash=' + hashReceiver + '&submit=Compose',
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         body: JSON.stringify({subject: subject, message: message}),
        //         }
        //     )
        //     .then(response => {
        //     if (response.ok) {
        //         console.log(response);
        //     }
        //     throw new Error('Failed to send message');
        //     })
        // }
        // catch(error){
        //     setError(error);
        //     console.error('Error:', error);
        // }
          
    } 

    function handleReceiverChange(e) {
        setHashReceiver(e.target.value);
    }

    function handleSubjectChange(e) {
        setSubject(e.target.value);
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }


    return (
        <div>
            <div className='message-title'>
            <h1>Messages</h1>
            {/* add a circle add icon button */}
            <Button color='secondary' onClick={toggleNewMessage} ><AddCircleIcon /></Button>
            
            </div>
            
            <div className='inbox'>
                <AlignItemsList />
                {newMessage && 
                <div style={{width: "50%"}}>
                    <div className='message-box'>
                    {newMessage && <Button sx={{float: "right", marginRight: "3%"}} color='secondary' onClick={toggleNewMessage} ><CloseIcon /></Button>}
                    <Subject placeholder='To' value={hashReceiver} onChange={handleReceiverChange} />
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