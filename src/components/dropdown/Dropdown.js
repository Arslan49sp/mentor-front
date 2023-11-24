import "./dropdown.scss";

const Dropdown = (props) => {
  const { label, options, value, onChange } = props;
  return (
    <div className="drop-container">
      <label> {label} </label>
      <select value={value} onChange={onChange}>
        <option>{label}</option>
        {options?.map((option) => {
          if (typeof option === "string") {
            return <option key={option}>{option} </option>;
          } else {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default Dropdown;
