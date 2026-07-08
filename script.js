const imagekit = new ImageKit({
  publicKey: "public_XzVWt5/m2Et2BMa6+YFcklT+Xh4=",
  urlEndpoint: "https://ik.imagekit.io/0jy74u8i9",
  authenticationEndpoint: "/.netlify/functions/auth"
});

const fileInput = document.getElementById("file");
const uploadBtn = document.querySelector("button");
const status = document.getElementById("status");
const urlBox = document.getElementById("url");
const preview = document.getElementById("preview");

async function uploadImage() {

    const file = fileInput.files[0];

    if (!file) {
        status.innerHTML = "⚠ Please select an image.";
        return;
    }

    if (!file.type.startsWith("image/")) {
        status.innerHTML = "❌ Only image files are allowed.";
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        status.innerHTML = "❌ Max file size is 10MB.";
        return;
    }

    uploadBtn.disabled = true;
    uploadBtn.innerHTML = "Uploading...";
    status.innerHTML = "⏳ Uploading image...";

    try {

        const auth = await fetch("/.netlify/functions/auth");
        const authData = await auth.json();

        imagekit.upload({
            file: file,
            fileName: Date.now() + "_" + file.name,
            token: authData.token,
            signature: authData.signature,
            expire: authData.expire
        }, (error, result) => {

            uploadBtn.disabled = false;
            uploadBtn.innerHTML = "Upload";

            if (error) {
                console.error(error);
                status.innerHTML = "❌ Upload Failed!";
                return;
            }

            status.innerHTML = "✅ Upload Successful!";

            urlBox.value = result.url;

            preview.src = result.url;
            preview.style.display = "block";

        });

    } catch (err) {

        console.error(err);

        uploadBtn.disabled = false;
        uploadBtn.innerHTML = "Upload";

        status.innerHTML = "❌ Server Error.";

    }

}

function copyUrl() {

    if (urlBox.value === "") {
        alert("No URL Found!");
        return;
    }

    navigator.clipboard.writeText(urlBox.value);

    status.innerHTML = "📋 URL Copied!";
        }
