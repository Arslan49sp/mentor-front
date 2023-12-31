import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Description should at least 2 characters" })
    .max(50, {
      message: "Description should contain maximum of 50 characters",
    }),
});

type ClassFormData = z.infer<typeof schema>;

interface Props {
  showModal: boolean;
  handleClose: () => void;
  onSubmit: (data: ClassFormData) => void;
}
const AddClassModel = ({ onSubmit, showModal, handleClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleShow = () => {
    if (modalRef.current) {
      window.$(modalRef.current).modal("show");
    }
  };

  handleShow();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassFormData>({ resolver: zodResolver(schema) });
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!showModal}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add new class
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClassModel;
