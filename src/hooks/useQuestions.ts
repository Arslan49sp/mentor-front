import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

interface Question {
  id: number;
  stem: string;
  chapter_id: number;
  subject_id: number;
  question_type: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct: string;
  explaination: string;
  answer: string;
}

interface Res {
  status: string;
  message: string;
  data: Question[];
}

const useQuestions = (subjId: number) => {
  const url = baseUrl + `/questions?subjectId=${subjId}`;
  const fetchQuestions = () => axios.get<Res>(url).then((res) => res.data);

  return useQuery<Res, Error>({
    queryKey: ["subject", subjId, "questions"],
    queryFn: fetchQuestions,
    staleTime: 2 * 60 * 1000,
  });
};

export default useQuestions;
