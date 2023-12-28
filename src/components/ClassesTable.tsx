import useClasses from "../hooks/useClasses";

const ClassesTable = () => {
  const { data, isLoading, error } = useClasses();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return null; // Handle the case when data is null
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr className="d-flex">
          <th className="col-1">#</th>
          <th className="col-8">Name</th>
          <th className="col-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((classI) => (
          <tr key={classI.id} className="d-flex">
            <td className="col-1">{classI.id}</td>
            <td className="col-8">{classI.name}</td>
            <td className="col-3"></td>
          </tr>
        ))}
      </tbody>
    </table>
    // <div>
    //   <p>Status: {data.status}</p>
    //   <p>Message: {data.message}</p>
    //   <ul>
    //     {data.data.map((classItem) => (
    //       <li key={classItem.id}>{classItem.name}</li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default ClassesTable;
