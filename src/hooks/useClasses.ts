import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_CLASSES } from "../data/constants";

export interface Class {
  id: number;
  name: string;
}

export interface ClassRes {
  status: string;
  message: string;
  data: Class[];
}
const useClasses = () => {
  const url = baseUrl + "/academic-classes";
  const fetchClasses = () => axios.get<ClassRes>(url).then((res) => res.data);

  return useQuery<ClassRes, Error>({
    queryKey: CACHE_KEY_CLASSES,
    queryFn: fetchClasses,
    staleTime: 2 * 60 * 1000,
  });
};

export default useClasses;
