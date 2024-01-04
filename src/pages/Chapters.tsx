import { useState } from "react";
import ChaptersTable from "../components/ChaptersTable";
import ClassSelector from "../components/ClassSelector";
import SubjectSelector from "../components/SubjectSelector";
import AddChapterModal from "../components/AddChapterModal";

const Chapters = () => {
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };
  return (
    <div className="p-5">
      <h1>Chapters</h1>
      <hr />
      <div className="d-flex gap-2 mb-2">
        <ClassSelector
          setSelectedClassId={(classId) => setSelectedClassId(classId)}
        />
        {selectedClassId && (
          <SubjectSelector
            classId={selectedClassId}
            setSelectedSubjId={(subjId) => setSelectedSubjectId(subjId)}
          />
        )}
      </div>
      {selectedSubjectId && (
        <>
          <button className="btn btn-success mb-2" onClick={handleShow}>
            Add New
          </button>
          <ChaptersTable subjectId={selectedSubjectId} />
          <AddChapterModal
            subjectId={selectedSubjectId}
            isShow={showModal}
            handleClose={handleClose}
          />
        </>
      )}
    </div>
  );
};

export default Chapters;
