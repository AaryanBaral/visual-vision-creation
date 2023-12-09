const {getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject} = require("firebase/storage");
const { initializeApp } = require("firebase/app") ;
const firebaseAuth = require("../configure/FirebaseConfig");

initializeApp(firebaseAuth);

const storage = getStorage();


exports.UploadImage = async(file)=>{
    const dateTime = Date.now();
    const filename = `/image/${dateTime}`
    const storageRef = ref(storage, filename)
    const metaData = {
        contentType:file.type,
    }
    const uploaded = await uploadBytesResumable(storageRef, file.buffer, metaData);
    const DownloadUrl = await getDownloadURL(uploaded.ref);
    return {DownloadUrl,storageRef};

}

exports.DeleteImage = async(url)=>{
    try{
        const storageRef = ref(storage,url);
        await deleteObject(storageRef);
        return true;
    }catch(err){
        return false
    }
}