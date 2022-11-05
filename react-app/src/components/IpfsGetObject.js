const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY });
const s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});

const IpfsGetObject = async (body, bucketName, key, contentType) => {
  const _getObject = async (body, bucketName, key, contentType) => {
    const params = {
      Bucket: bucketName,
      Key: key
    };

    //upload
    const _res = s3.getObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });

    return _res;
  };

  const res = await _getObject(body, bucketName, key, contentType);
  return res;
};

export default IpfsGetObject;
