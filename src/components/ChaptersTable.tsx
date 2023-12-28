import { FaRegEye, FaPencil, FaTrash } from "react-icons/fa6";
import useChapters from "../hooks/useChapters";

interface Props {
  subjectId: number;
}
const ChaptersTable = ({ subjectId }: Props) => {
  const { data, isLoading, error } = useChapters(subjectId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <table className="table table-bordered ">
      <thead>
        <tr className="d-flex">
          <th className="sr-width text-center">#</th>
          <th className="flex-grow-1">Name</th>
          <th className="text-center px-5">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((classI, index) => (
          <tr key={classI.id} className="d-flex">
            <td className="sr-width text-center">{index + 1}</td>
            <td className="flex-grow-1">{classI.name}</td>
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

export default ChaptersTable;
