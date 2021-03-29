import { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "../firebase";
import '../ImageUpload.css'
import firebase from "firebase";

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [process, setProcess] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //process.....
        const process =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProcess(process);
      },
      (err) => {
        //errr
        console.log(err);
        alert(err.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image into db
            const dataUpload = {
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            };
            db.collection("posts").add(dataUpload);
            setProcess(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      
      <input
        type="text"
        placeholder="Enter a caption..."
        className="upload_caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <progress className="uploadProcess" value={process} max="100"></progress>
      <Button className="uploadButton" onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
