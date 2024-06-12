import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';





export default function AlignItemsList({subject, sender, message}) {
  const [subject1, setSubject] = useState('');
  const [sender1, setSender] = useState('');
  const [message1, setMessage] = useState('');


  // function fetchInboxItem(){
  //   fetch('http://localhost:8090/yacy/message.html')
  //   .then(response => response.text())
  //   .then(data => {
  //     console.log('data:', data);
  //     // setSubject(data[0].subject);
  //     // setSender(data[0].sender);
  //     // setMessage(data[0].message);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }

  // React.useEffect(() => {
  //   fetchInboxItem();
  // }, []);

  return (
    <List sx={{ width: '50%', margin: 'auto'}}>

      <ListItem alignItems="flex-start">
        
        <ListItemAvatar>
          <Avatar alt="Travis Howard" />
        </ListItemAvatar>
        
        <ListItemText
          primary= {JSON.stringify(subject1)}
          secondary={
            <React.Fragment>


              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {JSON.stringify(sender1)}
              </Typography>


              {JSON.stringify(message1)}
            </React.Fragment>
          }
        />

      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
    </List>
  );
}