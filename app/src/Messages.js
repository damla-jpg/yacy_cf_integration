import * as React from 'react';
import MessageBox from './components/MessageBox';
import AlignItemsList from './components/Inbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useState } from 'react';
 

function Messages() {
    let [newMessage, setNewMessage] = useState(false);

    function toggleNewMessage() {
        setNewMessage(!newMessage);
    }

    let [ipReceiver, setIpReceiver] = useState('');
    let [hashReceiver, setHashReceiver] = useState('');
    let [subject, setSubject] = useState('');
    let [message, setMessage] = useState('');
    let [error, setError] = useState(null);

    function getHashReceiver() {
        fetch('http://localhost:8090/yacy/message.html?process=permission')
        .then(response => {
            if (response.ok) {
                console.log('response', response);
                return response.json();
            }
            throw new Error('Failed to fetch profile');
        }
        )
        .then(data => {
            console.log('data:', data);
            // setHashReceiver(data.hash);
            // console.log('hashReceiver:', data.hash);
        }
        )
        .catch(error => {
            console.log('Error:', error);
        }
        );
    }

    React.useEffect(() => {
        getHashReceiver();
    }
    , []);

    
  
    function sendMessage() {

      try{
        fetch('http://localhost:8090/yacy/message.html?process=permission')
        .then(response => {
          if (response.ok) {
            console.log(response);
          }
          throw new Error('Failed to send message');
        })
      }
      catch(error){
        setError(error);
        console.error('Error:', error);
      }
          
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
                    {newMessage && <Button sx={{float: "right", marginRight: "3%"}} color='secondary' onClick={toggleNewMessage} ><CloseIcon /></Button>}
                    <MessageBox />
                    <Button variant="contained" color='secondary' size='large' sx={{ float:'right', marginRight: '10%' }} onClick={getHashReceiver}>Send</Button>
                    
                </div>}
            </div>
        </div>
    );
}

export default Messages;