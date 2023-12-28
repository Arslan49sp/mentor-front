import ClassesTable from "../components/ClassesTable";
import AddClassModel from "../components/AddClassModel";

const Classes = () => {
  return (
    <div className="p-5">
      <h1>Classes</h1>
      <hr />
      <button
        type="button"
        className="btn btn-success mb-2"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add new
      </button>
      <ClassesTable />
      <AddClassModel />
    </div>
  );
};

export default Classes;
