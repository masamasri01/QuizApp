import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HOST_NAME } from "../../../utils";

export const useFetchQuizDetails = (quizId) => {
    console.log(quizId);
  return useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      const response = await axios.get(`${HOST_NAME}/api/quizzes/${quizId}`);
      return response.data;
    },
  });
};
