import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

const useQuestions = (subjId: number) => {
  const url = baseUrl + `/questions?subjectId=${subjId}`;
  const fetchQuestions = () => axios.get(url).then((res) => res.data.data);

  return useQuery({
    queryKey: ["subject", subjId, "questions"],
    queryFn: fetchQuestions,
    staleTime: 2 * 60 * 1000,
  });
};

export default useQuestions;
