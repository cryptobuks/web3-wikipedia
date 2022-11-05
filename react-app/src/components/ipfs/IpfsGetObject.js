import { useEffect, useState } from "react";
const AWS = require('aws-sdk');

AWS.config.update({ accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY });
const s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});


const IpfsGetObject = async (setResponse, bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  };

  // download
  let _res;
  s3.getObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
      _res = Buffer.from(data.Body, 'utf8').toString();
      setResponse(_res);
    }
  });
};

export default IpfsGetObject;
