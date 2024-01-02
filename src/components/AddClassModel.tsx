import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { baseUrl } from "../data/api";
import { Class } from "../hooks/useClasses";
import { useEffect, useRef } from "react";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Description should at least 2 characters" })
    .max(50, {
      message: "Description should contain maximum of 50 characters",
    }),
});

export type ClassFormData = z.infer<typeof schema>;
const AddClassModel = () => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassFormData>({ resolver: zodResolver(schema) });
  const storeUrl = baseUrl + "/academic-classes";
  const queryClient = useQueryClient();

  const addClass = useMutation({
    mutationFn: (newClass: ClassFormData) =>
      axios.post<Class>(storeUrl, newClass).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allClass"],
      });
    },
  });

  useEffect(() => {
    if (addClass.isSuccess) {
      // If the mutation is successful, close the modal
      const modalElement = modalRef.current;
      if (modalElement) {
        modalRef.current.setAttribute("data-bs-dismiss", "modal");
      }
    }
  }, [addClass.isSuccess]);
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
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
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit((data) => {
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
              <button ref={modalRef} className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClassModel;
