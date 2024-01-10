interface Props {
  setSelectedQuestionType: (questionType: string) => void;
}

const QuestionTypeSelector = ({ setSelectedQuestionType }: Props) => {
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuestionType = event.target.value;
    setSelectedQuestionType(selectedQuestionType);
  };
  return (
    <div className="form-floating col">
      <select
        onChange={handleTypeChange}
        id="questionSelector"
        className="form-select"
      >
        <option value="multiple_choice">MCQS</option>
        <option value="blank">Blank</option>
        <option value="short_question">Short</option>
        <option value="long_question">Long</option>
      </select>
      <label id="questionSelector" className="ms-2">
        Question Type
      </label>
    </div>
  );
};

export default QuestionTypeSelector;
