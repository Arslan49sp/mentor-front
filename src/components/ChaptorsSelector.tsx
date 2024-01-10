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
  const foundChapter = data?.data.find((c) => c.id === selectedChapterId);
  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChapterId = parseInt(event.target.value, 10);
    setSelectedChapterId(selectedChapterId);
  };
  return (
    <div className="form-floating col-3">
      <select
        onChange={handleChapterChange}
        id="chaptorSelector"
        className="form-select"
        value={foundChapter?.name || ""}
      >
        <option>--</option>
        {data?.data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <label id="chaptorSelector">Choose Chapter</label>
    </div>
  );
};

export default ChaptorsSelector;
