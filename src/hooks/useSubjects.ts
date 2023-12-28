import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

const useSubjects = (classId: number) => {
  const url = baseUrl + `/academic-subjects?classId=${classId}`;
  const fetchSubjects = () => axios.get(url).then((res) => res.data.data);

  return useQuery({
    queryKey: ["class", classId, "subjects"],
    queryFn: fetchSubjects,
    staleTime: 2 * 60 * 1000,
  });
};

export default useSubjects;