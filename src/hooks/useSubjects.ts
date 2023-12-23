import axios from "axios";
import { preURL } from "../data/api";
import { useQuery } from "@tanstack/react-query";

const useSubjects = (classId: number) => {
  const url = preURL + `/academic-subjects?classId=${classId}`;
  const fetchSubjects = () => axios.get(url).then((res) => res.data.data);

  return useQuery({
    queryKey: ["class", classId, "subjects"],
    queryFn: fetchSubjects,
    staleTime: 2 * 60 * 1000,
  });
};

export default useSubjects;
