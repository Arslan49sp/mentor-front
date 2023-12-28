import ClassesTable from "../components/ClassesTable";

const Classes = () => {
  return (
    <div className="p-5">
      <h1>Classes</h1>
      <hr />
      <button className="btn btn-success mb-2">Add new</button>
      <ClassesTable />
    </div>
  );
};

export default Classes;
