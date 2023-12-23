import axios from "axios";
import { preURL } from "../data/api";
import { useQuery } from "@tanstack/react-query";

const useChapters = (subjId: number) => {
  const url = preURL + `/chapters?subjectId=${subjId}`;
  const fetchChapters = () => axios.get(url).then((res) => res.data.data);

  return useQuery({
    queryKey: ["subject", subjId, "chapters"],
    queryFn: fetchChapters,
    staleTime: 2 * 60 * 1000,
  });
};

export default useChapters;
