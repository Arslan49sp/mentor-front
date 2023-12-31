import ClassesTable from "../components/ClassesTable";
import AddClassModel from "../components/AddClassModel";
import { useState } from "react";

const Classes = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };
  return (
    <div className="p-5">
      <h1>Classes</h1>
      <hr />
      <button
        className="btn btn-success mb-2"
        data-bs-toggle="modal"
        onClick={handleShow}
      >
        Add new
      </button>
      <ClassesTable />
      <AddClassModel
        showModal={showModal}
        handleClose={handleClose}
        onSubmit={(data) => console.log(data)}
      />
    </div>
  );
};

export default Classes;
