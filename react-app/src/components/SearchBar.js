import { useState } from "react";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {

  const [inputValue, setInputValue] = useState();

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 1000 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Web3 Wikipedia"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" component={Link} to="/ListView">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar;
