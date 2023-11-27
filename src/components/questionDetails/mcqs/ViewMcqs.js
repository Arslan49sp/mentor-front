import "./view-mcqs.scss";
const ViewMcqs = (props) => {
  const { slug, setOpen, question } = props;
  return (
    <div className="view-mcqs">
      <div className="modal">
        <span
          className="close"
          onClick={() => {
            setOpen(false);
          }}
        >
          X
        </span>
        <h1>{slug} detial</h1>
        <h4> Question: {question.stem} </h4>
        <p className="options">A. {question.option_a} </p>
        <p className="options">B. {question.option_b} </p>
        <p className="options">C. {question.option_c} </p>
        <p className="options">D. {question.option_d} </p>

        <p>
          <span>Correct: </span>
          {question.correct_answer}
        </p>
        <p>
          <span>Explaination: </span>
          {question.explanation}
        </p>
      </div>
    </div>
  );
};

export default ViewMcqs;
