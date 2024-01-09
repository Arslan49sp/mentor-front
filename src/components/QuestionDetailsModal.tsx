import { Modal } from "react-bootstrap";
import { Question } from "../hooks/useQuestions";

interface Props {
  isShow: boolean;
  handleClose: () => void;
  question: Question | null;
}
const QuestionDetailsModal = ({ isShow, handleClose, question }: Props) => {
  return (
    <Modal
      centered
      show={isShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Question Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="">Question: {question?.stem}</h5>
        {question?.type === "multiple_choice" && (
          <div className="ms-4">
            <p>
              <strong>A: </strong> {question?.option_a}
            </p>
            <p>
              <strong>B: </strong> {question?.option_b}
            </p>
            <p>
              <strong>C: </strong> {question?.option_c}
            </p>
            <p>
              <strong>D: </strong> {question?.option_d}
            </p>
          </div>
        )}
        <hr className="mb-0" />
        <div className="mt-0">
          <h5 className="d-inline me-2">Answer:</h5>
          <span>{question?.correct_answer}</span>
        </div>
        <div className="mt-3">
          <h5 className="d-inline me-2">Explaination:</h5>
          <span>{question?.explanation}</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuestionDetailsModal;
