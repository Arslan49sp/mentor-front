import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
interface RequestRes<T> {
  status: string;
  message: string;
  data: T[];
}
const useDelete = <T extends { id: number }>(
  handleClose: () => void,
  currentId: number,
  cacheKey: (string | number)[]
) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string, unknown>({
    mutationFn: (url: string) => axios.delete(url).then((res) => res.data),
    onSuccess: () => {
      // queryClient.invalidateQueries(["allClass"]); //first approach
      queryClient.setQueryData<RequestRes<T> | undefined>(
        cacheKey,
        (classRes) => {
          const existingClasses = classRes?.data || [];
          const newClasses = existingClasses.filter(
            (cls) => cls.id !== currentId
          );
          return {
            data: newClasses,
            status: classRes?.status || "",
            message: classRes?.message || "",
          };
        }
      );
      handleClose();
    },
  });
};
export default useDelete;
