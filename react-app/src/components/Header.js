import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Header = () => {

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" underline="none">
              {'web3Wiki'}
            </Link>
          </Typography>

        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default Header;