import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

interface Chapter {
  id: number;
  name: string;
}

interface Res {
  status: string;
  message: string;
  data: Chapter[];
}
const useChapters = (subjId: number) => {
  const url = baseUrl + `/chapters?subjectId=${subjId}`;
  const fetchChapters = () => axios.get<Res>(url).then((res) => res.data);

  return useQuery<Res, Error>({
    queryKey: ["subject", subjId, "chapters"],
    queryFn: fetchChapters,
    staleTime: 2 * 60 * 1000,
  });
};

export default useChapters;
