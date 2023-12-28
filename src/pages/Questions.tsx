import { useState } from "react";
import ClassSelector from "../components/ClassSelector";
import SubjectSelector from "../components/SubjectSelector";
import ChaptorsSelector from "../components/ChaptorsSelector";

const Questions = () => {
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
  const [selectedChapterId, setSelectedChapterId] = useState<number>();
  return (
    <div className="p-5">
      <h1>Questions</h1>
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
        {selectedSubjectId && (
          <ChaptorsSelector
            subjId={selectedSubjectId}
            setSelectedChapterId={(chapterId) =>
              setSelectedChapterId(chapterId)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
