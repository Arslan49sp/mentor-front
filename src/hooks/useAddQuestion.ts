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

const useAddQuestion = (onAdd: () => void, cacheKey: (string | number)[]) => {
  const queryClient = useQueryClient();
  return useMutation<addQuestionRes, Error, NewQuestion>({
    mutationFn: (newQuestion) =>
      axios
        .post<addQuestionRes>(addQuestionUrl, newQuestion)
        .then((res) => res.data),
    onSuccess: (savedQuestion) => {
      // queryClient.invalidateQueries(["allClass"]); //first approach
      queryClient.setQueryData<QuestionRes | undefined>(
        cacheKey,
        (questionRes) => {
          const existingChapters = questionRes?.data || [];
          return {
            data: [savedQuestion.data, ...existingChapters],
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
