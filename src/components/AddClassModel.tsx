import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { baseUrl } from "../data/api";
import { Class } from "../hooks/useClasses";
import { Modal } from "react-bootstrap";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Description should at least 2 characters" })
    .max(50, {
      message: "Description should contain maximum of 50 characters",
    }),
});
export type ClassFormData = z.infer<typeof schema>;

interface Props {
  handleClose: () => void;
  isShow: boolean;
}
const AddClassModel = ({ handleClose, isShow }: Props) => {
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
  const addClass = useMutation({
    mutationFn: (newClass: ClassFormData) =>
      axios.post<Class>(storeUrl, newClass).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allClass"],
      });
      handleClose();
    },
  });
  return (
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
      </Modal.Body>
    </Modal>
  );
};

export default AddClassModel;
