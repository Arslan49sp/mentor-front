import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddClass from "../hooks/useAddClass";
import ErrorToast from "./ErrorToast";
import { Class } from "../hooks/useClasses";
import { addClassUrl } from "../data/api";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should at least 2 characters" })
    .max(50, {
      message: "Name should contain maximum of 50 characters",
    }),
});
export type ClassFormData = z.infer<typeof schema>;

interface Props {
  handleClose: () => void;
  isShow: boolean;
  currentClass?: Class | null;
  slug?: string;
}
const AddClassModel = ({ handleClose, isShow, currentClass, slug }: Props) => {
  const [showToast, setShowToast] = useState(true);
  //It's a useform hook which provide us different functionalities for handling form.
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ClassFormData>({ resolver: zodResolver(schema) });

  // Set the initial form data based on the currentClass
  useEffect(() => {
    if (currentClass) {
      Object.entries(currentClass).forEach(([key, value]) => {
        setValue(key as "name", value);
      });
    }
  }, [currentClass, setValue]);

  let url;
  currentClass
    ? (url = addClassUrl + "/" + currentClass.id)
    : (url = addClassUrl);

  //mutaion hook
  const addClass = useAddClass(handleClose, url, slug);

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
          <Modal.Title>{slug ? slug : "add new"} class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit((data) => {
              setShowToast(true);
              addClass.mutate(data);
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
            <button className="btn btn-primary">
              {slug ? slug : "Submit"}
            </button>
          </form>
          {addClass.error && (
            <ErrorToast
              isShow={showToast}
              handleClose={() => setShowToast(false)}
              message={addClass.error.message}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddClassModel;
