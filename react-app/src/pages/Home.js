import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from "../components/Header";
import ButtonComponent from "../components/ButtonComponent"
import { Searcher } from '../Search';

const Home = () => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [metaMaskFlag, setMetaMaskFlag] = useState(false);

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
            <div>{account}</div>
            <div>
              {account ? (
                <button type="button" class="btn btn-dark">Connected</button>
              ) : (
                <button type="button" class="btn btn-secondary" onClick={connectWallet}>Connected Wallet</button>
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <ButtonComponent
              name="New"
              to="/Edit"
            />
          </Grid>
          <Grid item xs={12}>
            {/* reduxできるまで一時的に以下のように記載 */}
                  <Searcher />
            <Link to="/ListView"><input class="form-control" placeholder="検索"></input></Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;