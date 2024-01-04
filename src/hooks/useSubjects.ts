import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

export interface Subject {
  id: number;
  name: string;
  academic_class_id: number;
}

export interface SubjectRes {
  status: string;
  message: string;
  data: Subject[];
}

const useSubjects = (classId: number) => {
  const url = baseUrl + `/academic-subjects?classId=${classId}`;
  const fetchSubjects = () =>
    axios.get<SubjectRes>(url).then((res) => res.data);

  return useQuery<SubjectRes, Error>({
    queryKey: ["class", classId, "subjects"],
    queryFn: fetchSubjects,
    staleTime: 2 * 60 * 1000,
  });
};

export default useSubjects;
