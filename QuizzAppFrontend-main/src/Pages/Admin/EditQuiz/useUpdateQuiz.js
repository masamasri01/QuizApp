import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { HOST_NAME } from "../../../utils";

export const useUpdateQuiz = (quizId, setFlashMessage,refetch) => {
  return useMutation({
    mutationFn: async (updatedQuiz) => {
      const response = await axios.put(`${HOST_NAME}/api/quizzes/${quizId}`, null, {
        params: updatedQuiz,
      });
      return response.data;
    },
    onSuccess: () => {
      setFlashMessage({ message: "Quiz updated successfully", type: "success" });
      refetch();
    },
  });
};
