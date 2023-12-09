const {getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject} = require("firebase/storage");
const { initializeApp } = require("firebase/app") ;
const firebaseAuth = require("../configure/FirebaseConfig");

initializeApp(firebaseAuth);

const storage = getStorage();


exports.UploadImage = async(file)=>{
    const dateTime = Date.now();
    const filename = `/image/${dateTime}`
    const storageRef = ref(storage, filename)
    console.log(storageRef)
    const metaData = {
        contentType:file.type,
    }
    const uploaded = await uploadBytesResumable(storageRef, file.buffer, metaData);
    const DownloadUrl = await getDownloadURL(uploaded.ref);
    console.log(storageRef);
    console.log(uploaded)
    return {DownloadUrl,storageRef};

}
exports.DeleteImage = async(url)=>{
    try{
        const storageRef = ref(storage,url);
        console.log(storageRef)
        await deleteObject(storageRef);
        return true;
    }catch(err){
        return false
    }
}