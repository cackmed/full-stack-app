import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';


const ResponseBox = ({ response }) => {
  if(response.statusCode === 400) {

    const responseMessages = Object.keys(response).map((key, index) => {
      if(index === 0) {
        return (
          <ListItem disablePadding key={index}>
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon >
            <ListItemText primary={'Status Code: 400'} />
          </ListItem >

        );        

      } else {
        return ( 
          <ListItem disablePadding key={index}>
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon >
            <ListItemText primary={`${key}: ${response[key]}`} />
          </ListItem >
        );        
      }
    });
      

    return ( 
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
        <List>
          {responseMessages}
        </List>
      </Box>
    );
    
  } else {
    return ( 
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary={'Notification Successfully Recieved'} />
          </ListItem>
        </List>
      </Box>
    );
        
  }
};

ResponseBox.propTypes = {
  response: PropTypes.any.isRequired
};
  

export default ResponseBox;
