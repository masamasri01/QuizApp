import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchQuizQuestions = async (quizId) => {
  try {
    const response = await axios.get(`${BASE_URL}/quizzes/${quizId}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz questions", error);
    return [];
  }
};

export const fetchQuestionOptions = async (questionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/questions/${questionId}/options`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question options", error);
    return [];
  }
};
