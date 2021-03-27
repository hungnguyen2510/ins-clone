import "./App.css";
import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db, auth } from "./firebase";
import ModalSignIn from "./components/ModalSignIn";
import ModalSignUp from "./components/ModalSignUp";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setOpenSignIn(false);
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => {
        alert("Sign Up Err: " + err.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setOpenSignIn(false);
      })
      .catch((err) => {
        alert("Sign In Err: " + err.message);
      });
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged in..
        setUser(authUser);
      } else {
        setUser(null);
        //logged out..
      }
    });
    return () => {
      unsubcribe();
    };
  }, []);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="app">
      <ModalSignIn
        openSignIn={openSignIn}
        onClose={() => setOpenSignIn(false)}
        modalStyle={modalStyle}
        paper={classes.paper}
        email={email}
        password={password}
        signIn={signIn}
        onEmail={(e) => setEmail(e.target.value)}
        onPassword={(e) => setPassword(e.target.value)}
      />

      <ModalSignUp
        openSignUp={openSignUp}
        onClose={() => setOpenSignUp(false)}
        modalStyle={modalStyle}
        paper={classes.paper}
        username={username}
        email={email}
        password={password}
        signUp={signUp}
        onUsername={(e) => setUsername(e.target.value)}
        onEmail={(e) => setEmail(e.target.value)}
        onPassword={(e) => setPassword(e.target.value)}
      />
      {/* Header */}
      <div className="app_header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          className="app_headerImage"
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
        </div>
      )}

      {posts && posts.length > 0 ? <Post posts={posts} /> : "Loading....."}
    </div>
  );
}

export default App;
