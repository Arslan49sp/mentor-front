import Toast from "react-bootstrap/esm/Toast";

interface Props {
  message: string;
  isShow: boolean;
  handleClose: () => void;
}
const ErrorToast = ({ message, isShow, handleClose }: Props) => {
  return (
    <Toast
      className="w-100 mt-2 "
      onClose={handleClose}
      show={isShow}
      delay={3000}
      autohide
    >
      <Toast.Header closeButton={false}>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Mentor</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ErrorToast;
