const AWS = require('aws-sdk');

AWS.config.update({ accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY });
const s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});


const IpfsGetObject = async (setResponse, bucketName, key, testDummy=[]) => {
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
      if (testDummy.length === 0) {
        console.log(_res);
        setResponse(_res);
      } else {
        console.log("Now using dummy test data")
        _res = JSON.parse(_res);
        // setResponse(testDummy);
        setResponse([...testDummy, _res]);
      }
    }
  });
};

export default IpfsGetObject;
