import useClasses from "../hooks/useClasses";

const ClassesTable = () => {
  const { data } = useClasses();
  console.log(data);
  return <div>ClassesTable</div>;
};

export default ClassesTable;
