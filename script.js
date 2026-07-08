const imagekit = new ImageKit({
  publicKey: "public_XzVWt5/m2Et2BMa6+YFcklT+Xh4=",
  urlEndpoint: "https://ik.imagekit.io/0jy74u8i9",
  authenticationEndpoint: "/.netlify/functions/auth"
});

async function uploadImage() {

  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  document.getElementById("status").innerHTML = "Uploading...";

  try {

    const auth = await fetch("/.netlify/functions/auth").then(res => res.json());

    imagekit.upload({
      file: file,
      fileName: file.name,
      token: auth.token,
      expire: auth.expire,
      signature: auth.signature
    }, function(error, result) {

      if (error) {
        console.log(error);
        document.getElementById("status").innerHTML = "Upload Failed!";
      } else {
        document.getElementById("status").innerHTML = "Upload Successful!";
        document.getElementById("url").value = result.url;
      }

    });

  } catch (e) {
    console.log(e);
    document.getElementById("status").innerHTML = "Something went wrong!";
  }

}

function copyUrl() {

  const url = document.getElementById("url");

  url.select();
  document.execCommand("copy");

  alert("Image URL Copied!");
    }
