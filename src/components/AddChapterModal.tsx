import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorToast from "./ErrorToast";
import useAddSubject from "../hooks/useAddSubject";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should at least 2 characters" })
    .max(50, {
      message: "Name should contain maximum of 50 characters",
    }),
  chapter_number: z
    .number({ invalid_type_error: "Chapter number is required" })
    .min(1)
    .max(100),
});
export type SubjectFormData = z.infer<typeof schema>;

interface Props {
  subjectId: number;
  handleClose: () => void;
  isShow: boolean;
}
const AddChapterModal = ({ subjectId, handleClose, isShow }: Props) => {
  const [showToast, setShowToast] = useState(true);
  //It's a useform hook which provide us different functionalities for handling form.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectFormData>({ resolver: zodResolver(schema) });
  const CACHE_KEY_CHAPTERS = ["class", subjectId, "subjects"];
  const onAdd = () => {
    reset();
    handleClose();
  };
  //mutaion hook
  const addSubject = useAddSubject(onAdd, CACHE_KEY_CHAPTERS);

  return (
    <>
      <Modal
        centered
        show={isShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit((data) => {
              setShowToast(true);
              const chapterData = {
                id: 0,
                academic_subject_id: subjectId,
                ...data,
              };
              //   addSubject.mutate(chapterData);
              // reset();
            })}
          >
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="form-control"
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message} </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="chNum">Chapter Number</label>
              <input
                {...register("chapter_number")}
                id="chNum"
                type="number"
                className="form-control"
              />
              {errors.chapter_number && (
                <p className="text-danger">{errors.chapter_number.message} </p>
              )}
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
          {addSubject.error && (
            <ErrorToast
              isShow={showToast}
              handleClose={() => setShowToast(false)}
              message={addSubject.error.message}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChapterModal;
