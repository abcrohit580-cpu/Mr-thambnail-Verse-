const imagekit = new ImageKit({
    publicKey: "public_XzVWt5/m2Et2BMa6+YFcklT+Xh4=",
    urlEndpoint: "https://ik.imagekit.io/0jy74u8i9",
    authenticationEndpoint: "/.netlify/functions/auth"
});

const fileInput = document.getElementById("file");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");
const urlBox = document.getElementById("url");
const preview = document.getElementById("preview");
const progressBox = document.getElementById("progressBox");
const progressBar = document.getElementById("progressBar");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const uploadTime = document.getElementById("uploadTime");
const toast = document.getElementById("toast");

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) return;

    fileName.innerHTML = file.name;

    fileSize.innerHTML = (file.size / 1024 / 1024).toFixed(2) + " MB";

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

});

function showToast(msg){

    toast.innerHTML = msg;
    toast.style.display="block";

    setTimeout(()=>{
        toast.style.display="none";
    },2500);

}

async function uploadImage(){

    const file = fileInput.files[0];

    if(!file){
        showToast("⚠ Select an image first");
        return;
    }

    uploadBtn.disabled=true;
    uploadBtn.innerHTML="Uploading...";

    status.innerHTML="Uploading Image...";

    progressBox.style.display="block";
    progressBar.style.width="20%";

    try{

        const auth=await fetch("/.netlify/functions/auth");

        const authData=await auth.json();

        progressBar.style.width="50%";

        imagekit.upload({

            file:file,

            fileName:Date.now()+"_"+file.name,

            token:authData.token,

            signature:authData.signature,

            expire:authData.expire

        },(error,result)=>{

            uploadBtn.disabled=false;

            uploadBtn.innerHTML="📤 Upload Image";

            if(error){

                console.log(error);

                progressBar.style.width="0%";

                status.innerHTML="❌ Upload Failed";

                showToast("Upload Failed");

                return;

            }

            progressBar.style.width="100%";

            status.innerHTML="✅ Upload Successful";

            urlBox.value=result.url;

            preview.src=result.url;

            uploadTime.innerHTML=new Date().toLocaleTimeString();

            showToast("Upload Successful 🎉");

        });

    }

    catch(e){

        console.log(e);

        uploadBtn.disabled=false;

        uploadBtn.innerHTML="📤 Upload Image";

        progressBar.style.width="0%";

        status.innerHTML="❌ Server Error";

        showToast("Server Error");

    }

}

function copyUrl(){

    if(urlBox.value==""){

        showToast("No URL Available");

        return;

    }

    navigator.clipboard.writeText(urlBox.value);

    showToast("📋 URL Copied");

}

function openImage(){

    if(urlBox.value==""){

        showToast("No Image");

        return;

    }

    window.open(urlBox.value,"_blank");

}

function downloadImage(){

    if(urlBox.value==""){

        showToast("No Image");

        return;

    }

    const a=document.createElement("a");

    a.href=urlBox.value;

    a.download="thumbnail";

    a.click();

        }
