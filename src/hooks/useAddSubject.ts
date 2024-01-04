import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addSubjectUrl } from "../data/api";
import { Subject, SubjectRes } from "./useSubjects";

interface addSubjectRes {
  status: string;
  message: string;
  data: Subject;
}

const useAddSubject = (onAdd: () => void, cacheKey: (string | number)[]) => {
  const queryClient = useQueryClient();
  return useMutation<addSubjectRes, Error, Subject>({
    mutationFn: (newSubject) =>
      axios
        .post<addSubjectRes>(addSubjectUrl, newSubject)
        .then((res) => res.data),
    onSuccess: (savedSubject) => {
      // queryClient.invalidateQueries(["allClass"]); //first approach
      queryClient.setQueryData<SubjectRes | undefined>(
        cacheKey,
        (subjectRes) => {
          const existingSubjects = subjectRes?.data || [];
          return {
            data: [savedSubject.data, ...existingSubjects],
            status: subjectRes?.status || "",
            message: subjectRes?.message || "",
          };
        }
      );
      onAdd();
    },
  });
};

export default useAddSubject;
