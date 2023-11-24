import "./dropdown.scss";

const Dropdown = (props) => {
  const { label, options, value } = props;
  return (
    <div className="drop-container">
      <label> {label} </label>
      <select value={value}>
        <option>{label}</option>
        {options.map((option) => {
          return <option> {option.value} </option>;
        })}
      </select>
    </div>
  );
};

export default Dropdown;
