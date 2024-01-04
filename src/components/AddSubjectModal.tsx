import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddClass from "../hooks/useAddClass";
import ErrorToast from "./ErrorToast";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should at least 2 characters" })
    .max(50, {
      message: "Name should contain maximum of 50 characters",
    }),
});
export type SubjectFormData = z.infer<typeof schema>;

interface Props {
  classId: number;
  handleClose: () => void;
  isShow: boolean;
}
const AddSubjectModal = ({ isShow, handleClose, classId }: Props) => {
  const [showToast, setShowToast] = useState(true);
  //It's a useform hook which provide us different functionalities for handling form.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectFormData>({ resolver: zodResolver(schema) });

  //mutaion hook
  const addSubject = useAddClass(handleClose);

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
          <Modal.Title>Add new subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit((data) => {
              setShowToast(true);
              const subData = { academic_class_id: classId, ...data };
              addSubject.mutate(subData);
              reset();
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

export default AddSubjectModal;
