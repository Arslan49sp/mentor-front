import { useEffect } from "react";
import useChapters from "../hooks/useChapters";

interface Props {
  subjId: number;
  selectedChapterId: number;
  setSelectedChapterId: (chapterId: number) => void;
}
const ChaptorsSelector = ({
  selectedChapterId,
  subjId,
  setSelectedChapterId,
}: Props) => {
  const { data } = useChapters(subjId);
  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChapterId = parseInt(event.target.value, 10);
    setSelectedChapterId(selectedChapterId);
  };
  useEffect(() => {}, [selectedChapterId]);
  return (
    <div className="form-floating col">
      <select
        onChange={handleChapterChange}
        id="chaptorSelector"
        className="form-select"
        value={selectedChapterId}
      >
        <option>--</option>
        {data?.data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <label id="chaptorSelector" className="ms-2">
        Choose Chapter
      </label>
    </div>
  );
};

export default ChaptorsSelector;
