import { useEffect, useState } from "react";
import ClassSelector from "../components/ClassSelector";
import SubjectsTable from "../components/SubjectsTable";
import AddSubjectModal from "../components/AddSubjectModal";

const Subjects = () => {
  const [selectedClassId, setSelectedClassId] = useState<number>(
    parseInt(sessionStorage.getItem("subjectClass") || "") || 0
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("subjectClass", selectedClassId.toString());
  }, [selectedClassId]);

  // use to clear the session storage when a user refresh the page.
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
          selectedClassId={selectedClassId}
          setSelectedClassId={(classId) => setSelectedClassId(classId)}
        />
      </div>

      {selectedClassId !== 0 && (
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
