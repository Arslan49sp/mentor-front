import "./view-mcqs.scss";
const ViewMcqs = (props) => {
  const { slug, setOpen } = props;
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
        <h1>Mcqs detial</h1>
      </div>
    </div>
  );
};

export default ViewMcqs;
