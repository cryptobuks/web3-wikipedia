import { useEffect, useState } from "react";
import IpfsCreateObject from "./IpfsCreateObject";
import IpfsGetObject from "./IpfsGetObject";

var AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY });
var s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});


const IpfsTest = () => {
  // const [ipfs, setIpfs] = useState();
  const [response, setResponse] = useState();
  const data = 'Hello, Web3Wikipedia';

  useEffect(() => {
    (async () => {
      // const res = await IpfsCreateObject(data, "web3-wiki", "testKey1", "text/plain");
      // setIpfs(res);
      // console.log(res);
      await IpfsGetObject(setResponse, "web3-wiki", "test-content-0.json")
      console.log(response);
    })()
  },[])

  return (
    <div>{response}</div>
  )
}

export default IpfsTest;
