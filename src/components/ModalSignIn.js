import { Modal, Button, Input } from "@material-ui/core";

const ModalSignIn = ({
  openSignIn,
  onClose,
  modalStyle,
  paper,
  email,
  password,
  onEmail,
  onPassword,
  signIn
}) => {
  return (
    <Modal
      open={openSignIn}
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

          <Button onClick={signIn}>Sign In</Button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSignIn;
