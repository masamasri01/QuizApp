// useAddQuestion.js
import { useState } from "react";
import axios from "axios";
import { HOST_NAME } from "../../../utils";

export const useAddQuestion = (quizId, refetch) => {
  const [flashMessage, setFlashMessage] = useState({ message: "", type: "" });

  const addQuestion = async (questionData) => {
    try {
      await axios.post(`${HOST_NAME}/api/quizzes/${quizId}/questions`, questionData);
      refetch();
      setFlashMessage({ message: "Question added successfully!", type: "success" });
    } catch (error) {
      setFlashMessage({ message: "Failed to add question!", type: "error" });
    }
  };

  return { addQuestion, flashMessage };
};
