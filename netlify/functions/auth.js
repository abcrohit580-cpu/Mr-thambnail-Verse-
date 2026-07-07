const ImageKit = require("imagekit");

exports.handler = async function () {
  const imagekit = new ImageKit({
    publicKey: "public_XzVWt5/m2Et2BMa6+YFcklT+Xh4=",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/0jy74u8i9"
  });

  const authParams = imagekit.getAuthenticationParameters();

  return {
    statusCode: 200,
    body: JSON.stringify(authParams)
  };
};
