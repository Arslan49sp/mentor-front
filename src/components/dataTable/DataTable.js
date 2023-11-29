import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import ViewMcqs from "../questionDetails/mcqs/ViewMcqs";
import Add from "../add/Add";
import { baseURL } from "../../data/data";
import Swal from "sweetalert2";
import { deleteQuestion } from "../../data/api";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuestion(number).then(
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          })
        );
        typeof props.setAddedItem === "function" &&
          props.setAddedItem("deleted");
      }
    });
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
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal",
            lineHeight: "normal",
          },
          "& .MuiDataGrid-columnHeader": {
            // Forced to use important since overriding inline styles
            height: "unset !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            // Forced to use important since overriding inline styles
            maxHeight: "168px !important",
          },
        }}
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
          setAddedItem={
            typeof props.setAddedItem === "function" && props.setAddedItem
          }
          url={baseURL + `/questions/${requestedQuestion.id}`}
          data={requestedQuestion}
          btnLabel="Update"
        />
      )}
    </div>
  );
};

export default DataTable;
