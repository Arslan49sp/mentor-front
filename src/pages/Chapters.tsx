import { useState } from "react";
import ChaptersTable from "../components/ChaptersTable";
import ClassSelector from "../components/ClassSelector";
import SubjectSelector from "../components/SubjectSelector";

const Chapters = () => {
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
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
      {selectedSubjectId && <ChaptersTable subjectId={selectedSubjectId} />}
    </div>
  );
};

export default Chapters;
