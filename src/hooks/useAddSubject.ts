import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Subject, SubjectRes } from "./useSubjects";

interface addSubjectRes {
  status: string;
  message: string;
  data: Subject;
}

const useAddSubject = (onAdd: () => void, cacheKey: (string | number)[], url: string, slug: string | undefined, id: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<addSubjectRes, Error, Subject>({
    mutationFn: (newSubject) =>
      axios
        .post<addSubjectRes>(url, newSubject)
        .then((res) => res.data),
    onSuccess: (savedSubject) => {
      // queryClient.invalidateQueries(["allClass"]); //first approach
      queryClient.setQueryData<SubjectRes | undefined>(
        cacheKey,
        (subjectRes) => {
          const existingSubjects = subjectRes?.data || [];
          let finalSubjects;
          slug ?
           finalSubjects = existingSubjects.filter(
            (cls) => cls.id !== id
          ): finalSubjects = existingSubjects
          return {
            data: [savedSubject.data, ...finalSubjects],
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
