import axios from "axios";
import { HOST_NAME } from "../../../../utils";

export const fetchOptionsAPI = async (questionId) => {
  const response = await axios.get(`${HOST_NAME}/api/questions/${questionId}/options`);
  return response.data;
};

export const addOptionAPI = async (questionId, optionText, isCorrect) => {
  await axios.post(`${HOST_NAME}/api/questions/${questionId}/options`, {
    option_text: optionText,
    is_correct: isCorrect ? 1 : 0,
  });
};

export const editQuestionAPI = async (questionId, questionText) => {
  await axios.put(`${HOST_NAME}/api/quizzes/1/questions/${questionId}`, {
    question_text: questionText,
  });
};
