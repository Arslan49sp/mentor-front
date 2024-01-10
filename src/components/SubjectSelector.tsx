import React from "react";
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
  return (
    <div className="form-floating col-3">
      <select
        onChange={handleSubjChange}
        id="subjSelector"
        className="form-select"
      >
        <option>--</option>
        {data?.data.map((item) => (
          <option
            selected={selectedSubjectId === item.id}
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>
      <label id="subjSelector">Choose subject</label>
    </div>
  );
};

export default SubjectSelector;
