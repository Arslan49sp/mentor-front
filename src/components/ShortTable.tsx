import { FaRegEye, FaPencil, FaTrash } from "react-icons/fa6";
import { Question, QuestionRes } from "../hooks/useQuestions";
import { useState } from "react";
import useDelete from "../hooks/useDelete";
import { baseUrl } from "../data/api";
import ErrorToast from "./ErrorToast";
import DeleteModal from "./DeleteModal";

interface Props {
  shorts: Question[];
  type: string;
  subjId: number;
}
const ShortTable = ({ shorts, type, subjId }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const mutation = useDelete<QuestionRes>(handleClose, currentId, [
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
            <th className={type === "blank" ? "col-2" : "col-4"}>Answer</th>
            <th className="text-center px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shorts.map((question, index) => (
            <tr key={question.id} className="d-flex">
              <td className="sr-width text-center">{index + 1}</td>
              <td className="flex-grow-1">{question.stem}</td>
              <td className={type === "blank" ? "col-2" : "col-4"}>
                {question.correct_answer}
              </td>
              <td className="d-flex flex-nowrap gap-0">
                <button className="btn btn-link text-success">
                  <FaRegEye size={23} />
                </button>
                <button className="btn btn-link text-success">
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
    </>
  );
};

export default ShortTable;
