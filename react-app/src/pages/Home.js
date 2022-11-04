import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
      <h1>Web3 Wikipedia</h1>
      <Link type="button" class="btn btn-secondary" to="/Edit">New</Link>
      <div>{account}</div>
      <div>
        {account ? (
          <button type="button" class="btn btn-dark">Connected</button>
        ) : (
          <button type="button" class="btn btn-secondary" onClick={connectWallet}>Connected Wallet</button>
        )}
      </div>
      {/* reduxできるまで一時的に以下のように記載 */}
      <Link to="/ListView"><input class="form-control" placeholder="検索"></input></Link>
    </div>
  );
};

export default Home;