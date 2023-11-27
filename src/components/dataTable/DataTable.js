import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import ViewMcqs from "../questionDetails/mcqs/ViewMcqs";
import Add from "../add/Add";
import { baseURL } from "../../data/data";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// type Props = {
//   columns: GridColDef[];
//   rows: object[];
//   slug: string;
// };

const DataTable = (props) => {
  // TEST THE API

  // const queryClient = useQueryClient();
  // // const mutation = useMutation({
  // //   mutationFn: (id: number) => {
  // //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
  // //       method: "delete",
  // //     });
  // //   },
  // //   onSuccess: ()=>{
  // //     queryClient.invalidateQueries([`all${props.slug}`]);
  // //   }
  // // });

  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [requestedQuestion, setREquestedQuestion] = useState({});

  const handleDelete = (number) => {
    //delete the item
    // mutation.mutate(id)
    console.log(number);
  };

  const handleView = (number) => {
    setREquestedQuestion(props.rows.find((obj) => obj.id == number));
    setOpen(true);
  };

  const handleEdit = (number) => {
    setREquestedQuestion(props.rows.find((obj) => obj.id == number));
    setUpdateOpen(true);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="delete" onClick={() => handleEdit(params.row.id)}>
            <img src="/view.svg" alt="" />
          </div>
          <div className="delete" onClick={() => handleView(params.row.id)}>
            <img src="/eye.svg" alt="" />
          </div>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        // disableColumnFilter
        disableDensitySelector
        // disableColumnSelector
      />
      {open && (
        <ViewMcqs slug="Mcqs" question={requestedQuestion} setOpen={setOpen} />
      )}

      {updateOpen && (
        <Add
          slug="question"
          columns={props.columns}
          setOpen={setUpdateOpen}
          url={baseURL + `/questions/${requestedQuestion.id}`}
          data={requestedQuestion}
        />
      )}
    </div>
  );
};

export default DataTable;
