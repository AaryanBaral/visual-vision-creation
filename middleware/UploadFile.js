const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage");
const { initializeApp } = require("firebase/app") ;
const firebase = require("../configure/FirebaseConfig");

initializeApp(firebase);



exports.UploadImage = async(file)=>{
    const storage = getStorage();
    const dateTime = Date.now();
    const filename = `/image/${dateTime}`
    const storageRef = ref(storage, filename)
    const metaData = {
        contentType:file.type,
    }
    const uploaded = await uploadBytesResumable(storageRef, file.buffer, metaData)
    const DownloadUrl = await getDownloadURL(uploaded.ref)
    return DownloadUrl;

}