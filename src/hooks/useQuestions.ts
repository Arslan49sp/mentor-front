import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

export interface Question {
  id: number;
  type: string;
  stem: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  chapter_id: number;
  academic_subject_id: number;
  correct_answer: string;
  explanation: string;
}

export interface QuestionRes {
  status: string;
  message: string;
  data: Question[];
}

const useQuestions = (subjId: number) => {
  const url = baseUrl + `/questions?subjectId=${subjId}`;
  const fetchQuestions = () =>
    axios.get<QuestionRes>(url).then((res) => res.data);

  return useQuery<QuestionRes, Error>({
    queryKey: ["subject", subjId, "questions"],
    queryFn: fetchQuestions,
    staleTime: 2 * 60 * 1000,
  });
};

export default useQuestions;
