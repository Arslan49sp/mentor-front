import axios from "axios";
import { baseURL } from "../data/api";
import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  const url = baseURL + "/academic-classes";
  const fetchClasses = () => axios.get(url).then((res) => res.data.data);

  return useQuery({
    queryKey: ["allClass"],
    queryFn: fetchClasses,
    staleTime: 2 * 60 * 1000,
  });
};

export default useClasses;
