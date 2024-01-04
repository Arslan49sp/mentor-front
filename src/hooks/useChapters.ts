import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

export interface Chapter {
  id: number;
  name: string;
  chapter_number: number;
  academic_subject_id: number;
}

export interface ChapterRes {
  status: string;
  message: string;
  data: Chapter[];
}
const useChapters = (subjId: number) => {
  const url = baseUrl + `/chapters?subjectId=${subjId}`;
  const fetchChapters = () =>
    axios.get<ChapterRes>(url).then((res) => res.data);

  return useQuery<ChapterRes, Error>({
    queryKey: ["subject", subjId, "chapters"],
    queryFn: fetchChapters,
    staleTime: 2 * 60 * 1000,
  });
};

export default useChapters;
