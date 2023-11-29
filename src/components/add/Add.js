import "./add.scss";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Add = (props) => {
  const [formData, setFormData] = useState({});
  const {
    slug,
    url,
    columns,
    setOpen,
    setAddType,
    setAddedItem,
    data,
    btnLabel,
  } = props;

  useEffect(() => {
    // Merge incomingData with the current state using spread operator
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, [data]);
  const handleInputChange = (event, field) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  // TEST THE API

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(url, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },
    onSuccess: () => {
      setAddedItem(`${slug} added`);
      queryClient.invalidateQueries([`all${slug}s`]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(url);
    console.log(data);
    //add new item
    mutation.mutate();
    console.log("Form Data:", formData);
    typeof setAddType === "function" && setAddType("");
    setOpen(false);
  };
  return (
    <div className="add">
      <div className="modal">
        <span
          className="close"
          onClick={() => {
            setOpen(false);
            typeof setAddType === "function" && setAddType("");
          }}
        >
          X
        </span>
        <h1> {btnLabel ? `Update ${slug}` : `Add new ${slug}`}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter(
              (item) => !item.field.endsWith("id") && item.field !== "img"
            )
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input
                  required={column.required}
                  type={column.type}
                  placeholder={column.field}
                  value={formData[column.field] || ""}
                  onChange={(event) => handleInputChange(event, column.field)}
                />
              </div>
            ))}
          <button> {btnLabel || "Add"} </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
