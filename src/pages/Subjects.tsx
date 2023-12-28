import { useState } from "react";
import ClassSelector from "../components/ClassSelector";
import SubjectsTable from "../components/SubjectsTable";

const Subjects = () => {
  const [selectedClassId, setSelectedClassId] = useState<number>();
  return (
    <div className="p-5">
      <h1>Subjects</h1>
      <hr />
      <div className="mb-2">
        <ClassSelector
          setSelectedClassId={(classId) => setSelectedClassId(classId)}
        />
      </div>

      {selectedClassId && <SubjectsTable classId={selectedClassId} />}
    </div>
  );
};

export default Subjects;
