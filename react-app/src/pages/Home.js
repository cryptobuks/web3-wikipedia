import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ethers } from "ethers";
import { useDispatch,useSelector } from "react-redux";

import Header from "../components/Header";
import ButtonComponent from "../components/ButtonComponent"
import store from '../store';
import { inputWord, inputProvider, inputSigner } from "../walletSlice";
import SearchBar from "../components/SearchBar";
import { Searcher } from '../Search';


const Home = () => {
  const [account, setAccount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [chainId, setChainId] = useState();
  const [chainName, setChainName] = useState();

  store.dispatch(inputWord(account));
  store.dispatch(inputProvider(provider));
  store.dispatch(inputSigner(signer));
  console.log(store.getState());

  const connectWallet = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        setAccount(result[0]);
        setIsConnected(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const tmpFlag = window.ethereum && window.ethereum.isMetaMask;
    connectWallet();
  }, []);

  useEffect(() => {
    if(!account || !ethers.utils.isAddress(account)) {
      return
    }
    if(!window.ethereum) return

    // Web3Provider
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(web3Provider);

    console.log(chainName);
  }, [isConnected]);

  useEffect(() => {
    if(!account || !ethers.utils.isAddress(account)) {
      return
    }
    if(!window.ethereum) return
    // Localhost
    setSigner(provider.getSigner(0));
    
    // // Rinkeby
    // const newSigner = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
    // setSigner(newSigner);

    provider.getNetwork().then((result) => {
      setChainId(result.chainId)
      setChainName(result.name)
    })
  }, [provider]);

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
              to="/create"
              provider={provider}
              signer={signer}
              account={account}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
