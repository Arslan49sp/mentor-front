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
    <div>
      <p>Status: {data.status}</p>
      <p>Message: {data.message}</p>
      <ul>
        {data.data.map((classItem) => (
          <li key={classItem.id}>{classItem.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesTable;
