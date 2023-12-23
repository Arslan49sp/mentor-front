import useTodos from "../hooks/useTodos";
const Classes = () => {
  const { data } = useTodos();
  const url = import.meta.env.VITE_BASE_URL + "/academic-classes";
  console.log(url);
  return (
    <ul className="list-group">
      {data?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default Classes;
