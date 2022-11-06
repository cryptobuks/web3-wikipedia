import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ButtonComponent from "../components/ButtonComponent"
import '../components/css/font.css'
import store from '../store';
import { inputWord, inputProvider, inputSigner, inputDaoInst } from "../walletSlice";
import SearchBar from "../components/SearchBar";
import daoArtifact from "../contracts/DAO.json";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const daoAbi = daoArtifact.abi;
const daoAddr = "0xB4691AdC0641371C306654f92cf5b07D09E5E411";

const Home = () => {
  const [account, setAccount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [chainId, setChainId] = useState();
  const [chainName, setChainName] = useState();
  const [daoInst, setDaoInst] = useState();

  store.dispatch(inputWord(account));
  store.dispatch(inputProvider(provider));
  store.dispatch(inputSigner(signer));
  store.dispatch(inputDaoInst(daoInst));
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

  useEffect(() => {
    const _setDaoInst = async() => {
      console.log(account);
      if (account) {
        console.log('called')
        await setDaoInst(
          new ethers.Contract(daoAddr, daoAbi, signer)
        );
      }
    };
    _setDaoInst();
  },[provider, signer, account]);

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
              provider={provider}
              signer={signer}
              account={account}
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
