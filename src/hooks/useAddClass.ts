import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ClassFormData } from "../components/AddClassModel";
import { Class, ClassRes } from "./useClasses";
import { CACHE_KEY_CLASSES } from "../data/constants";

interface addClassRes {
  status: string;
  message: string;
  data: Class;
}

const useAddClass = (onAdd: () => void, url: string, slug: string | undefined, id: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<addClassRes, Error, ClassFormData>({
    mutationFn: (newClass: ClassFormData) =>
      axios.post<addClassRes>(url, newClass).then((res) => res.data),
    onSuccess: (savedClass) => {
      // slug ? 
      //  queryClient.invalidateQueries(["allClass"]) : //first approach
      queryClient.setQueryData<ClassRes | undefined>(
        CACHE_KEY_CLASSES,
        (classRes) => {
          const existingClasses = classRes?.data || [];
          let finalClasses;
          slug ?
           finalClasses = existingClasses.filter(
            (cls) => cls.id !== id
          ): finalClasses = existingClasses
          return {
            data: [savedClass.data, ...finalClasses],
            status: classRes?.status || "",
            message: classRes?.message || "",
          };
        }
      );
      onAdd();
    },
  });
};

export default useAddClass;
