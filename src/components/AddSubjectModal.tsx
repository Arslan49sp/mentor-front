import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorToast from "./ErrorToast";
import useAddSubject from "../hooks/useAddSubject";
import { Subject } from "../hooks/useSubjects";
import { addSubjectUrl } from "../data/api";

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
  currentClass?: Subject | null;
  slug?: string;
}
const AddSubjectModal = ({
  isShow,
  handleClose,
  classId,
  currentClass,
  slug,
}: Props) => {
  const [showToast, setShowToast] = useState(true);
  //It's a useform hook which provide us different functionalities for handling form.
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SubjectFormData>({ resolver: zodResolver(schema) });

  // Set the initial form data based on the currentClass
  useEffect(() => {
    if (currentClass) {
      Object.entries(currentClass).forEach(([key, value]) => {
        setValue(key as "name", value);
      });
    }
  }, [currentClass, setValue]);
  const CACHE_KEY_SUBJECTS = ["class", classId, "subjects"];
  const onAdd = () => {
    reset();
    handleClose();
  };

  let url;
  currentClass
    ? (url = addSubjectUrl + "/" + currentClass.id)
    : (url = addSubjectUrl);

  //mutaion hook
  const addSubject = useAddSubject(
    onAdd,
    CACHE_KEY_SUBJECTS,
    url,
    slug,
    currentClass?.id
  );

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
          <Modal.Title>{slug ? slug : "add new"} subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit((data) => {
              setShowToast(true);
              const subData = { id: 0, academic_class_id: classId, ...data };
              addSubject.mutate(subData);
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
            <button className="btn btn-primary">
              {slug ? slug : "Submit"}
            </button>
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
