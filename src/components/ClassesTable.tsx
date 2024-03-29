import { useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { addClassUrl } from "../data/api";
import { CACHE_KEY_CLASSES } from "../data/constants";
import useClasses, { Class } from "../hooks/useClasses";
import DeleteModal from "./DeleteModal";
import useDelete from "../hooks/useDelete";
import AddClassModel from "./AddClassModel";
import ErrorToast from "./ErrorToast";

const ClassesTable = () => {
  const { data, isLoading, error } = useClasses();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [showToast, setShowToast] = useState(true);
  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateClose = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const mutation = useDelete<Class>(handleClose, currentId, CACHE_KEY_CLASSES);

  const handleDelete = (id: number) => {
    setShowToast(true);
    const url = addClassUrl + "/" + id;
    mutation.mutate(url);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {mutation.error && (
        <ErrorToast
          isShow={showToast}
          handleClose={() => setShowToast(false)}
          message={mutation.error.message}
        />
      )}
      <table className="table table-bordered ">
        <thead>
          <tr className="d-flex">
            <th className="sr-width text-center">#</th>
            <th className="flex-grow-1">Name</th>
            <th className="text-center px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((classI, index) => (
            <tr key={classI.id} className="d-flex">
              <td className="sr-width text-center">{index + 1}</td>
              <td className="flex-grow-1">{classI.name}</td>
              <td className="d-flex flex-nowrap gap-0">
                <button
                  className="btn btn-link text-success"
                  onClick={() => {
                    setShowModal(true);
                    setCurrentClass(classI);
                  }}
                >
                  <FaPencil size={20} />
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setCurrentId(classI.id);
                  }}
                >
                  <FaTrash size={20} />
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
      <AddClassModel
        isShow={showModal}
        handleClose={handleUpdateClose}
        currentClass={currentClass}
        slug="Update"
      />
    </>
  );
};

export default ClassesTable;
