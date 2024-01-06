import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaPencil, FaRegEye, FaTrash } from "react-icons/fa6";
import { addClassUrl } from "../data/api";
import { CACHE_KEY_CLASSES } from "../data/constants";
import useClasses, { ClassRes } from "../hooks/useClasses";
import DeleteModal from "./DeleteModal";
import useDelete from "../hooks/useDelete";

const ClassesTable = () => {
  const { data, isLoading, error } = useClasses();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: (id: number) =>
  //     axios.delete(addClassUrl + "/" + id).then((res) => res.data),
  //   onSuccess: () => {
  //     // queryClient.invalidateQueries(["allClass"]); //first approach
  //     queryClient.setQueryData<ClassRes | undefined>(
  //       CACHE_KEY_CLASSES,
  //       (classRes) => {
  //         const existingClasses = classRes?.data || [];
  //         const newClasses = existingClasses.filter(
  //           (cls) => cls.id !== currentId
  //         );
  //         return {
  //           data: newClasses,
  //           status: classRes?.status || "",
  //           message: classRes?.message || "",
  //         };
  //       }
  //     );
  //     handleClose();
  //   },
  // });

  const mutation = useDelete<ClassRes>(
    handleClose,
    currentId,
    CACHE_KEY_CLASSES
  );

  const handleDelete = (id: number) => {
    console.log("deleted content: " + id);
    const url = addClassUrl + "/" + id;
    mutation.mutate(url);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <table className="table table-bordered ">
        <thead>
          <tr className="d-flex">
            <th className="sr-width text-center">#</th>
            <th className="flex-grow-1">Name</th>
            <th className="text-center px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((classI, index) => (
            <tr key={classI.id} className="d-flex">
              <td className="sr-width text-center">{index + 1}</td>
              <td className="flex-grow-1">{classI.name}</td>
              <td className="d-flex flex-nowrap gap-0">
                <button className="btn btn-link text-success">
                  <FaRegEye size={23} />
                </button>
                <button className="btn btn-link text-success">
                  <FaPencil size={19} />
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setCurrentId(classI.id);
                  }}
                >
                  <FaTrash size={19} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        isShow={showDeleteModal}
        handleClose={handleClose}
        handleDelete={() => handleDelete(currentId)}
      />
    </>
  );
};

export default ClassesTable;
