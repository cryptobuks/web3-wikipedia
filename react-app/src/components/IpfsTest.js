import { useEffect, useState } from "react";
import IpfsCreateObject from "./IpfsCreateObject";

var AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY });
var s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});

const IpfsTest = () => {
  const [ipfs, setIpfs] = useState();
  const data = 'Hello, Web3Wikipedia';

  useEffect(() => {
    (async () => {
      const res = await IpfsCreateObject(data, "web3-wiki", "testKey1", "text/plain");
      const s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});
      setIpfs(res);
      console.log(res);
    })()
  },[])

  return (
    <div>"test"</div>
  )
}

export default IpfsTest;
