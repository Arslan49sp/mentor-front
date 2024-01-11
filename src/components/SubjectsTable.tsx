import { FaPencil, FaTrash } from "react-icons/fa6";
import useSubjects, { Subject } from "../hooks/useSubjects";
import { useState } from "react";
import useDelete from "../hooks/useDelete";
import { baseUrl } from "../data/api";
import DeleteModal from "./DeleteModal";
import ErrorToast from "./ErrorToast";
import AddSubjectModal from "./AddSubjectModal";

interface Props {
  classId: number;
}
const SubjectsTable = ({ classId }: Props) => {
  const { data, isLoading, error } = useSubjects(classId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [showToast, setShowToast] = useState(true);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateClose = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const mutation = useDelete<Subject>(handleClose, currentId, [
    "class",
    classId,
    "subjects",
  ]);

  const handleDelete = (id: number) => {
    setShowToast(true);
    const url = baseUrl + "/academic-subjects/" + id;
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
                    setCurrentSubject(classI);
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
      <AddSubjectModal
        classId={classId}
        isShow={showModal}
        handleClose={handleUpdateClose}
        currentSubject={currentSubject}
        slug="Update"
      />
    </>
  );
};

export default SubjectsTable;
