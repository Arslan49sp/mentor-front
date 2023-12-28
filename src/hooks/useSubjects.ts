import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

interface Subject {
  id: number;
  name: string;
  academic_class_id: number;
}

interface Res {
  status: string;
  message: string;
  data: Subject[];
}

const useSubjects = (classId: number) => {
  const url = baseUrl + `/academic-subjects?classId=${classId}`;
  const fetchSubjects = () => axios.get<Res>(url).then((res) => res.data);

  return useQuery<Res, Error>({
    queryKey: ["class", classId, "subjects"],
    queryFn: fetchSubjects,
    staleTime: 2 * 60 * 1000,
  });
};

export default useSubjects;
