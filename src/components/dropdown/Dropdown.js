import "./dropdown.scss";

const Dropdown = (props) => {
  const { label, options, value, onChange } = props;
  return (
    <div className="drop-container">
      <label> {label} </label>
      <select value={value} onChange={onChange}>
        <option>--</option>
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
        <option value="0">Add new</option>
      </select>
    </div>
  );
};

export default Dropdown;
