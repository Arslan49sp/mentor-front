import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { baseUrl } from "../data/api";
import { Class, ClassRes } from "../hooks/useClasses";
import { Modal, Toast } from "react-bootstrap";
import { useState } from "react";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Description should at least 2 characters" })
    .max(50, {
      message: "Description should contain maximum of 50 characters",
    }),
});
export type ClassFormData = z.infer<typeof schema>;

interface addClassRes {
  status: string;
  message: string;
  data: Class;
}
interface Props {
  handleClose: () => void;
  isShow: boolean;
}
const AddClassModel = ({ handleClose, isShow }: Props) => {
  const [showToast, setShowToast] = useState(true);
  //It's a useform hook which provide us different functionalities for handling form.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassFormData>({ resolver: zodResolver(schema) });

  //It's a mutation hook which will store our data in the db and
  //then invalidate query.
  const storeUrl = baseUrl + "/academic-classes";
  const queryClient = useQueryClient();
  const addClass = useMutation<addClassRes, Error, ClassFormData>({
    mutationFn: (newClass: ClassFormData) =>
      axios.post<addClassRes>(storeUrl, newClass).then((res) => res.data),
    onSuccess: (savedClass) => {
      // queryClient.invalidateQueries(["allClass"]); //first approach
      queryClient.setQueryData<ClassRes | undefined>(
        ["allClass"],
        (classRes) => {
          const existingClasses = classRes?.data || [];
          return {
            data: [savedClass.data, ...existingClasses],
            status: classRes?.status || "",
            message: classRes?.message || "",
          };
        }
      );
      handleClose();
    },
  });

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
          <Modal.Title>Add new class</Modal.Title>
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
            <button className="btn btn-primary">Submit</button>
          </form>
          {addClass.error && (
            <Toast
              className="w-100 mt-2 "
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
            >
              <Toast.Header closeButton={false}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Mentor</strong>
                <small>now</small>
              </Toast.Header>
              <Toast.Body>{addClass.error.message}</Toast.Body>
            </Toast>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddClassModel;
