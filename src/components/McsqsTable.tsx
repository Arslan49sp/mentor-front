import { FaRegEye, FaPencil, FaTrash } from "react-icons/fa6";
import { Question } from "../hooks/useQuestions";
import { useState } from "react";
import { baseUrl } from "../data/api";
import useDelete from "../hooks/useDelete";
import ErrorToast from "./ErrorToast";
import DeleteModal from "./DeleteModal";
import { PreData } from "./AddQuestionModal";
import AddMcqsModal from "./AddMcqsModal";
import QuestionDetailsModal from "./QuestionDetailsModal";

interface Props {
  preData: PreData;
  mcqs: Question[];
  subjId: number;
}
const McsqsTable = ({ mcqs, subjId, preData }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [showToast, setShowToast] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleUpdateClose = () => {
    setShowModal(false);
  };
  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const mutation = useDelete<Question>(handleClose, currentId, [
    "subject",
    subjId,
    "questions",
  ]);

  const handleDelete = (id: number) => {
    setShowToast(true);
    const url = baseUrl + "/questions/" + id;
    mutation.mutate(url);
  };

  return (
    <>
      {mutation.error && (
        <ErrorToast
          isShow={showToast}
          handleClose={() => setShowToast(false)}
          message={mutation.error.message}
        />
      )}
      <table className="table table-bordered ">
        <thead>
          <tr className="d-flex">
            <th className="sr-width text-center">#</th>
            <th className="flex-grow-1">Statement</th>
            <th className="col-1 text-center">A</th>
            <th className="col-1 text-center">B</th>
            <th className="col-1 text-center">C</th>
            <th className="col-1 text-center">D</th>
            <th className="col-1 text-center">Correct</th>
            <th className="text-center px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mcqs.map((question, index) => (
            <tr key={question.id} className="d-flex">
              <td className="sr-width text-center">{index + 1}</td>
              <td className="flex-grow-1">{question.stem}</td>
              <td className="col-1 text-center">{question.option_a}</td>
              <td className="col-1 text-center">{question.option_b}</td>
              <td className="col-1 text-center">{question.option_c}</td>
              <td className="col-1 text-center">{question.option_d}</td>
              <td className="col-1 text-center">{question.correct_answer}</td>
              <td className="d-flex flex-nowrap gap-0">
                <button
                  className="btn btn-link text-success"
                  onClick={() => {
                    setCurrentQuestion(question);
                    setShowDetailsModal(true);
                  }}
                >
                  <FaRegEye size={23} />
                </button>
                <button
                  className="btn btn-link text-success"
                  onClick={() => {
                    setShowModal(true);
                    setCurrentQuestion(question);
                  }}
                >
                  <FaPencil size={19} />
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setCurrentId(question.id);
                  }}
                >
                  <FaTrash size={19} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        isShow={showDeleteModal}
        handleClose={handleClose}
        handleDelete={() => handleDelete(currentId)}
      />
      <AddMcqsModal
        preData={preData}
        isShow={showModal}
        handleClose={handleUpdateClose}
        currentChapter={currentQuestion}
        slug="Update"
      />

      <QuestionDetailsModal
        isShow={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        question={currentQuestion}
      />
    </>
  );
};

export default McsqsTable;
