import { Modal } from "react-bootstrap";

interface Props {
  isShow: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}
const DeleteModal = ({ isShow, handleClose, handleDelete }: Props) => {
  return (
    <Modal
      show={isShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmation!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this</Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-danger"
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          Yes
        </button>
        <button className="btn btn-success" onClick={handleClose}>
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
