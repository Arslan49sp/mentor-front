import { FaRegEye, FaPencil, FaTrash } from "react-icons/fa6";
import useChapters, { Chapter, ChapterRes } from "../hooks/useChapters";
import { useState } from "react";
import { baseUrl } from "../data/api";
import useDelete from "../hooks/useDelete";
import ErrorToast from "./ErrorToast";
import DeleteModal from "./DeleteModal";
import AddChapterModal from "./AddChapterModal";

interface Props {
  subjectId: number;
}
const ChaptersTable = ({ subjectId }: Props) => {
  const { data, isLoading, error } = useChapters(subjectId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [showToast, setShowToast] = useState(true);
  const [currentSubject, setCurrentSubject] = useState<Chapter | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateClose = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const mutation = useDelete<ChapterRes>(handleClose, currentId, [
    "subject",
    subjectId,
    "chapters",
  ]);

  const handleDelete = (id: number) => {
    setShowToast(true);
    const url = baseUrl + "/chapters/" + id;
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
                <button
                  className="btn btn-link text-success"
                  onClick={() => {
                    setShowModal(true);
                    setCurrentSubject(classI);
                  }}
                >
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

      <AddChapterModal
        subjectId={subjectId}
        isShow={showModal}
        handleClose={handleUpdateClose}
        currentSubject={currentSubject}
        slug="Update"
      />
    </>
  );
};

export default ChaptersTable;
