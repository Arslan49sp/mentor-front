import React, { useEffect } from "react";
import useSubjects from "../hooks/useSubjects";
interface Props {
  classId: number;
  selectedSubjectId: number;
  setSelectedSubjId: (subjId: number) => void;
}
const SubjectSelector = ({
  classId,
  selectedSubjectId,
  setSelectedSubjId,
}: Props) => {
  const { data } = useSubjects(classId);
  const handleSubjChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubjId = parseInt(event.target.value, 10);
    setSelectedSubjId(selectedSubjId);
  };

  useEffect(() => {}, [selectedSubjectId]);
  return (
    <div className="form-floating col">
      <select
        onChange={handleSubjChange}
        id="subjSelector"
        className="form-select"
        value={selectedSubjectId}
      >
        <option>--</option>
        {data?.data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <label id="subjSelector" className="ms-2">
        Choose subject
      </label>
    </div>
  );
};

export default SubjectSelector;
