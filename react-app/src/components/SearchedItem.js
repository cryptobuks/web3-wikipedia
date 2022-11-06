import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './css/SearchedItem.css';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled, Stack } from '@mui/system';

const SearchedItem = (props) => {
  return (
    <Box>
     <ListItemText primary={
       <Link to={"/detail"} state={{ title: props.title, contents: props.content, key: props.key }}>
      <Typography
                  sx={{  fontSize: 34 }}
                  component="span"
                  variant="body2"
                  >
        {props.title}
      </Typography>
     </Link>} secondary={props.content} sx={{ padding: 3}}/>
</Box>
  );
};

export default SearchedItem;
