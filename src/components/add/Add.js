import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// type Props = {
//   slug: string;
//   columns: GridColDef[];
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

const Add = (props) => {
  const [formData, setFormData] = useState({});

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
      return fetch(`http://15.207.247.8/api//academic-classes`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },
    onSuccess: () => {
      props.setAddedItem("class added");
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    //add new item
    mutation.mutate();
    console.log("Form Data:", formData);
    props.setAddType("");
    props.setOpen(false);
  };
  return (
    <div className="add">
      <div className="modal">
        <span
          className="close"
          onClick={() => {
            props.setOpen(false);
            props.setAddType("");
          }}
        >
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input
                  required
                  type={column.type}
                  placeholder={column.field}
                  onChange={(event) => handleInputChange(event, column.field)}
                />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
