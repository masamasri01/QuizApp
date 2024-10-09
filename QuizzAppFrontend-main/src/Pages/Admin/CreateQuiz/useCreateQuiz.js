// hooks/useCreateQuiz.js
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { HOST_NAME } from "../../../utils";
import { useNavigate } from "react-router-dom";

export const useCreateQuiz = (token, onQuizCreated) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const createQuiz = async (quizData) => {
    const response = await axios.post(`${HOST_NAME}/api/quizzes`, null, {
      params: quizData,
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };

  const { mutate: addQuiz } = useMutation({
    mutationFn: createQuiz,
    onSuccess: (data) => {
        if(data.id){
            setSuccessMessage("Quiz created successfully");
            navigate("/quizzes",{state:{message:"Quiz created successfully"}});
        } else {
            setErrorMessage("Failed to create quiz");
        }
      setSuccessMessage("Quiz created successfully");
      onQuizCreated();
    },
  });

  const handleResetMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return {
    addQuiz,
    errorMessage,
    successMessage,
    handleResetMessages,
  };
};
