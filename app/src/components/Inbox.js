import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function AlignItemsList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, margin: 'auto'}}>

      <ListItem alignItems="flex-start">
        
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>


              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                to Scott, Alex, Jennifer
              </Typography>


              {" — Wish I could come, but I'm out of town this..."}
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}