import axios from "axios";
import { baseUrl } from "../data/api";
import { useQuery } from "@tanstack/react-query";

export interface Class {
  id: number;
  name: string;
}

export interface Res {
  status: string;
  message: string;
  data: Class[];
}
const useClasses = () => {
  const url = baseUrl + "/academic-classes";
  const fetchClasses = () => axios.get<Res>(url).then((res) => res.data);

  return useQuery<Res, Error>({
    queryKey: ["allClass"],
    queryFn: fetchClasses,
    staleTime: 2 * 60 * 1000,
  });
};

export default useClasses;
