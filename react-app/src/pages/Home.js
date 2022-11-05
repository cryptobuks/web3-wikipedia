import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from "../components/Header";
import ButtonComponent from "../components/ButtonComponent"
import { useDispatch,useSelector } from "react-redux";
import store from '../store';
import { inputWord } from "../walletSlice";
import SearchBar from "../components/SearchBar";
import { Searcher } from '../Search';
import Button from '@mui/material/Button';

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
          <Grid item xs={12}>
              {account ? (
                <Button disabled>Connected {account}</Button>
              ) : (
                <Button onClick={connectWallet}>Connected Wallet</Button>
              )}
          </Grid>

          <Grid item xs={12}>
            {/* reduxできるまで一時的に以下のように記載 */}
                  {/* <Searcher /> */}
            <SearchBar />
          </Grid>
          <Grid item xs={12}>
            <ButtonComponent
             color="primary"
              name="New"
              to="/edit"
            />
          </Grid>

          
        </Grid>
      </Box>
    </div>
  );
};

export default Home;