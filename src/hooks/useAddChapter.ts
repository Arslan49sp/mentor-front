import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Chapter, ChapterRes } from "./useChapters";

interface addChapterRes {
  status: string;
  message: string;
  data: Chapter;
}

const useAddChapter = (onAdd: () => void, cacheKey: (string | number)[], url: string, slug: string | undefined, id: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<addChapterRes, Error, Chapter>({
    mutationFn: (newChapter) =>
      axios
        .post<addChapterRes>(url, newChapter)
        .then((res) => res.data),
    onSuccess: (savedChapter) => {
      // queryClient.invalidateQueries(["allClass"]); //first approach
      queryClient.setQueryData<ChapterRes | undefined>(
        cacheKey,
        (chapterRes) => {
          const existingChapters = chapterRes?.data || [];
          let finalChapters;
          slug ?
           finalChapters = existingChapters.filter(
            (cls) => cls.id !== id
          ): finalChapters = existingChapters
          return {
            data: [savedChapter.data, ...finalChapters],
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
