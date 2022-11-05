const AWS = require('aws-sdk');

AWS.config.update({ accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY });
const s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});


const IpfsCreateObject = async (body, bucketName, key, contentType) => {
  const _createObject = async (body, bucketName, key, contentType) => {
    const params = {
      Body: body,
      Bucket: bucketName,
      Key: key,
      ContentType: contentType
    };

    // upload
    const _res = s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });

    return _res;
  };

  const res = await _createObject(body, bucketName, key, contentType);
  return res;
};

export default IpfsCreateObject;
