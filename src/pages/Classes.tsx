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
      <button className="btn btn-success mb-2" onClick={handleShow}>
        Add new
      </button>
      <ClassesTable />
      <AddClassModel isShow={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Classes;
