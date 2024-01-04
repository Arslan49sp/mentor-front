import { useState } from "react";
import ClassSelector from "../components/ClassSelector";
import SubjectsTable from "../components/SubjectsTable";
import AddSubjectModal from "../components/AddSubjectModal";

const Subjects = () => {
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };
  return (
    <div className="p-5">
      <h1>Subjects</h1>
      <hr />
      <div className="mb-2">
        <ClassSelector
          setSelectedClassId={(classId) => setSelectedClassId(classId)}
        />
      </div>

      {selectedClassId && (
        <>
          <button className="btn btn-success mb-2" onClick={handleShow}>
            Add New
          </button>
          <SubjectsTable classId={selectedClassId} />
          <AddSubjectModal
            classId={selectedClassId}
            isShow={showModal}
            handleClose={handleClose}
          />
        </>
      )}
    </div>
  );
};

export default Subjects;
