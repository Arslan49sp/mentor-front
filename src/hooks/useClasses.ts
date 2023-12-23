import axios from "axios";
import { preURL } from "../data/api";
import { useQuery } from "@tanstack/react-query";

export interface Class {
  id: number;
  name: string;
}
const useClasses = () => {
  const url = preURL + "/academic-classes";
  const fetchClasses = () => axios.get<Class[]>(url).then((res) => res.data);
  return useQuery({
    queryKey: ["allClass"],
    queryFn: fetchClasses,
    staleTime: 2 * 60 * 1000,
  });
};

export default useClasses;
