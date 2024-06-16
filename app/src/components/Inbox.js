import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function AlignItemsList({items}) {

  return (
    <List sx={{ width: '50%', margin: 'auto' }}>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={item.from} />
          </ListItemAvatar>
          <ListItemText
            primary={item.subject}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {item.from}
                </Typography>
                {item.message}
              </React.Fragment>
            }
          />
        </ListItem>
        {index < items.length - 1 && <Divider variant="inset" component="li" />}
      </React.Fragment>
    ))}
  </List>
  );
}