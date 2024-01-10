import { useEffect, useState } from "react";
import ChaptersTable from "../components/ChaptersTable";
import ClassSelector from "../components/ClassSelector";
import SubjectSelector from "../components/SubjectSelector";
import AddChapterModal from "../components/AddChapterModal";

const Chapters = () => {
  const [selectedClassId, setSelectedClassId] = useState<number>(
    parseInt(sessionStorage.getItem("chapterClass") || "") || 0
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(
    parseInt(sessionStorage.getItem("chapterSubject") || "") || 0
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("chapterClass", selectedClassId.toString());
  }, [selectedClassId]);

  useEffect(() => {
    sessionStorage.setItem("chapterSubject", selectedSubjectId.toString());
  }, [selectedSubjectId]);

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
      <h1>Chapters</h1>
      <hr />
      <div className="d-flex gap-2 mb-2">
        <ClassSelector
          selectedClassId={selectedClassId}
          setSelectedClassId={(classId) => {
            setSelectedClassId(classId);
            setSelectedSubjectId(0);
          }}
        />
        {selectedClassId !== 0 && (
          <SubjectSelector
            selectedSubjectId={selectedSubjectId}
            classId={selectedClassId}
            setSelectedSubjId={(subjId) => setSelectedSubjectId(subjId)}
          />
        )}
      </div>
      {selectedSubjectId !== 0 && (
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
