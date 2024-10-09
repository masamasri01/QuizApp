import { useState } from "react";
import axios from "axios";
import { HOST_NAME } from "../../../utils";

export const useDeleteQuestion = (quizId, refetch) => {
  const [flashMessage, setFlashMessage] = useState({ message: "", type: "" });

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`${HOST_NAME}/api/quizzes/${quizId}/questions/${questionId}`);
      refetch();
      setFlashMessage({ message: "Question deleted successfully!", type: "success" });
    } catch (error) {
      setFlashMessage({ message: "Failed to delete question!", type: "error" });
    }
  };

  return { deleteQuestion, flashMessage };
};
