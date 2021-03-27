import { Modal, Button, Input } from "@material-ui/core";

const ModalSignUp = ({
  openSignUp,
  onClose,
  modalStyle,
  paper,
  username,
  email,
  password,
  onUsername,
  onEmail,
  onPassword,
  signUp
}) => {
  return (
    <Modal
      open={openSignUp}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={paper}>
        <form className="app_signup">
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              className="app_headerImage"
            />
          </center>
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={onUsername}
          ></Input>
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={onEmail}
          ></Input>

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={onPassword}
          ></Input>

          <Button onClick={signUp}>Sign Up</Button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSignUp;
