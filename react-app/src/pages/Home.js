import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from "../components/Header";
import ButtonComponent from "../components/ButtonComponent"
import { useDispatch,useSelector } from "react-redux";
import '../components/css/font.css'
import store from '../store';
import { inputWord } from "../walletSlice";
import SearchBar from "../components/SearchBar";
import { Searcher } from '../Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



const Home = () => {
  const accountinitialState = store.getState().setter.word;
  const [account, setAccount] = useState(accountinitialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [metaMaskFlag, setMetaMaskFlag] = useState(false);

  store.dispatch(inputWord(account));
  console.log(store.getState());
  //console.log(account);

  useEffect(() => {
    const tmpFlag = window.ethereum && window.ethereum.isMetaMask;
    setMetaMaskFlag(tmpFlag);
  }, []);

  const connectWallet = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        setAccount(result[0]);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="Home">
      <Header /> 
      <Box mt={10}>
        <Grid container rowSpacing={3} alignItems='center' justifyContent='center' direction="column">
            <Typography component="div">
              <Box id = "main-message" textAlign="center" m={1} mt={20}>
              Why don’t you use web3Wiki?
              </Box>
            </Typography>
            <Grid item mt={8}>
              <SearchBar/>
            </Grid>
            <Typography component="div">
              <Box id = "sub-message" textAlign="justify" m={1} mt={5}>
              sleepy sleepy sleepy sleepy sleepy ......I'll fill in something here later.I'll fill in something here later.I'll fill in something here later.
              </Box>
              <Box id = "sub-message" textAlign="justify" m={1}>
              I'll fill in something here later.I'll fill in something here later.
              </Box>
            </Typography>

          <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <ButtonComponent
             color="primary"
              name="New"
              to="/create"
            />

            {account ? (
                <Button disabled>Connected</Button>
              ) : (
                <Button onClick={connectWallet}>Connected Wallet</Button>
              )}
              </Stack>
          </Grid>          
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
