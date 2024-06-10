import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBsjlNlj6xyTMLE6NQEBfV18To_jBmI1-Y",
  authDomain: "macmaster-2b9ed.firebaseapp.com",
  projectId: "macmaster-2b9ed",
  storageBucket: "macmaster-2b9ed.appspot.com",
  messagingSenderId: "659210880348",
  appId: "1:659210880348:web:2c36137ee549fd3d442d99",
  measurementId: "G-V81MGKHP9P"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadFileToStorage = (file) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Handle upload progress if needed
            },
            (error) => {
                
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => resolve(downloadURL))
                    .catch((error) => reject(error));
            }
        );
    });
};

export default app;