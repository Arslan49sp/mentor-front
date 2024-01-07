import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addQuestionUrl } from "../data/api";
import { Question, QuestionRes } from "./useQuestions";
import { QuestionFormData } from "../components/AddQuestionModal";

interface addQuestionRes {
  status: string;
  message: string;
  data: Question;
}

interface NewQuestion extends QuestionFormData {
  type: string;
  chapter_id: number;
}

const useAddQuestion = (onAdd: () => void, cacheKey: (string | number)[], url: string, slug: string | undefined, id: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<addQuestionRes, Error, NewQuestion>({
    mutationFn: (newQuestion) =>
      axios
        .post<addQuestionRes>(url, newQuestion)
        .then((res) => res.data),
    onSuccess: (savedQuestion) => {
      // queryClient.invalidateQueries(["allClass"]); //first approach
      queryClient.setQueryData<QuestionRes | undefined>(
        cacheKey,
        (questionRes) => {
          const existingChapters = questionRes?.data || [];
          let finalChapters;
          slug ?
           finalChapters = existingChapters.filter(
            (cls) => cls.id !== id
          ): finalChapters = existingChapters
          return {
            data: [savedQuestion.data, ...finalChapters],
            status: questionRes?.status || "",
            message: questionRes?.message || "",
          };
        }
      );
      onAdd();
    },
  });
};

export default useAddQuestion;
