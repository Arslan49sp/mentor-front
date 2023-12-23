import axios from "axios";
import { baseURL } from "../data/api";
import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  // const url = baseURL + "/academic-classes";
  // const fetchClasses = () => axios.get(url).then((res) => res.data.data);
  // const fetchClasses = async () => {
  //   const response = await axios.get(url);
  //   return response; // Resolve the Promise with the entire response object
  // };

  const fetchClasses = () =>
    fetch("https://jsonplaceholder.typicode.com/posts").then(
      (response) => response
    );

  return useQuery({
    queryKey: ["allClass"],
    queryFn: fetchClasses,
    staleTime: 2 * 60 * 1000,
  });
};

export default useClasses;
