const ImageKit = require("imagekit");

exports.handler = async function () {
  const imagekit = new ImageKit({
    publicKey: "YOUR_PUBLIC_KEY",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/0jy74u8i9"
  });

  const authParams = imagekit.getAuthenticationParameters();

  return {
    statusCode: 200,
    body: JSON.stringify(authParams)
  };
};
