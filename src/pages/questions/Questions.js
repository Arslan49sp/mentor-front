import Dropdown from "../../components/dropdown/Dropdown";

const Questions = () => {
  //Fetch data and send to Single Component

  return (
    <div className="user">
      Questions
      <Dropdown label="Country" options={[{ value: "Pakistan" }]} />
    </div>
  );
};

export default Questions;
