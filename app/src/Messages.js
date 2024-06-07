import * as React from 'react';
import MessageBox from './components/MessageBox';
import AlignItemsList from './components/Inbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { useState } from 'react';
 

function Messages() {
    let [newMessage, setNewMessage] = useState(false);

    function toggleNewMessage() {
        setNewMessage(!newMessage);
    }

    return (
        <div>
            <div>
            <h1>Messages</h1>
            {/* add a circle add icon button */}
            <Button color='secondary' onClick={toggleNewMessage} ><AddCircleIcon /></Button>
            </div>
            
            <AlignItemsList />
            {newMessage && <MessageBox />}
        </div>
    );
}

export default Messages;