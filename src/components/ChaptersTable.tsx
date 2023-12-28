import { FaRegEye, FaPencil, FaTrash } from "react-icons/fa6";
import useClasses from "../hooks/useClasses";

const ChaptersTable = () => {
    const { data, isLoading, error } = useClasses();

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!data) {
      return null; // Handle the case when data is null
    }
  
    return (
      <table className="table table-bordered">
        <thead>
          <tr className="d-flex">
            <th className="col-1 text-center">#</th>
            <th className="col-9">Name</th>
            <th className="col-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((classI, index) => (
            <tr key={classI.id} className="d-flex">
              <td className="col-1 text-center ">{index + 1}</td>
              <td className="col-9">{classI.name}</td>
              <td className="col-2 text-center">
                <button className="btn btn-link text-success">
                  <FaRegEye size={25} />
                </button>
                <button className="btn btn-link text-success cbtn">
                  <FaPencil size={20} />
                </button>
                <button className="btn btn-link text-danger">
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}

export default ChaptersTable