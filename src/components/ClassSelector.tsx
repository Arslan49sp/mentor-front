import useClasses from "../hooks/useClasses";

interface Props {
  selectedClassId: number;
  setSelectedClassId: (classId: number) => void;
}
const ClassSelector = ({ selectedClassId, setSelectedClassId }: Props) => {
  const { data } = useClasses();
  const foundClass = data?.data.find((c) => c.id === selectedClassId);
  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = parseInt(event.target.value, 10);
    setSelectedClassId(selectedClassId);
  };
  return (
    <div className="form-floating col-3">
      <select
        onChange={handleClassChange}
        id="classSelector"
        className="form-select"
        value={foundClass?.name || ""}
      >
        <option>--</option>
        {data?.data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <label id="classSelector">Choose class</label>
    </div>
  );
};

export default ClassSelector;
