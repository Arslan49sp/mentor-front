import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addChapterUrl } from "../data/api";
import { Chapter, ChapterRes } from "./useChapters";

interface addChapterRes {
  status: string;
  message: string;
  data: Chapter;
}

const useAddChapter = (onAdd: () => void, cacheKey: (string | number)[]) => {
  const queryClient = useQueryClient();
  return useMutation<addChapterRes, Error, Chapter>({
    mutationFn: (newChapter) =>
      axios
        .post<addChapterRes>(addChapterUrl, newChapter)
        .then((res) => res.data),
    onSuccess: (savedChapter) => {
      // queryClient.invalidateQueries(["allClass"]); //first approach
      queryClient.setQueryData<ChapterRes | undefined>(
        cacheKey,
        (chapterRes) => {
          const existingChapters = chapterRes?.data || [];
          return {
            data: [savedChapter.data, ...existingChapters],
            status: chapterRes?.status || "",
            message: chapterRes?.message || "",
          };
        }
      );
      onAdd();
    },
  });
};

export default useAddChapter;
