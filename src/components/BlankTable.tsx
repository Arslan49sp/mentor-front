import { FaRegEye, FaPencil, FaTrash } from "react-icons/fa6";
import { Question } from "../hooks/useQuestions";

interface Props {
  blanks: Question[];
}
const BlankTable = ({ blanks }: Props) => {
  return (
    <table className="table table-bordered ">
      <thead>
        <tr className="d-flex">
          <th className="sr-width text-center">#</th>
          <th className="col-6">Statement</th>
          <th className="col-2 text-center">Correct</th>
          <th className="text-center px-5">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blanks.map((question, index) => (
          <tr key={question.id} className="d-flex">
            <td className="sr-width text-center">{index + 1}</td>
            <td className="flex-grow-1">{question.stem}</td>
            <th className="col-2 text-center">{question.correct_answer}</th>
            <td className="d-flex flex-nowrap gap-0">
              <button className="btn btn-link text-success">
                <FaRegEye size={23} />
              </button>
              <button className="btn btn-link text-success">
                <FaPencil size={19} />
              </button>
              <button className="btn btn-link text-danger">
                <FaTrash size={19} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlankTable;
