import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';
import './css/font.css'

const Header = () => {

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl" >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            <Link href="/" underline="none" >
              <div id = "service-name">web3Wiki</div>
            </Link>
          </Typography>
          {/* {props.isconnected ? <Button disabled>Connected</Button> : <Button disabled>Connected</Button>} */}
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default Header;