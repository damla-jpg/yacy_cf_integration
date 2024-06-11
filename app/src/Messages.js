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
                    <Button variant="contained" color='secondary' size='large' sx={{ float:'right', marginRight: '10%' }} onClick={toggleNewMessage}>Send</Button>
                    
                </div>}
            </div>
        </div>
    );
}

export default Messages;