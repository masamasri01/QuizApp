import axios from "axios";
import { HOST_NAME } from "../../../utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAllQuizzes = (token) => {
  const {state} = useLocation();

  const [message, setMessage] = useState(state?.message || "");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchQuizzes = async () => {
    const response = await axios.get(`${HOST_NAME}/api/quizzes`, {
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
  });

  const updateQuizStatus = async (quizId,prev) => {
    const response = await axios.put(`${HOST_NAME}/api/quizzes/${quizId}`, null, {
      params: { status: prev==0?"1":"0" },
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };

  const deleteQuizById = async (quizId) => {
    const response = await axios.delete(`${HOST_NAME}/api/quizzes/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };

  const { mutate: changeQuizStatus, isLoading: isStatusUpdating } = useMutation({
    mutationFn: ({ quizId, prev }) => updateQuizStatus(quizId, prev),
    onSuccess: () => {
      setMessage("Quiz status updated successfully");
    },
    onError: (error) => {
      setErrorMessage("Failed to update quiz status"); // Set error message
    },
  });

  const { mutate: deleteQuiz, isLoading: isDeleting } = useMutation({
    mutationFn: ({ quizId }) => deleteQuizById(quizId),
    onSuccess: () => {
      setMessage("Quiz deleted successfully");
    },
    onError: (error) => {
      setErrorMessage("Failed to delete quiz"); // Set error message
    },
  });

  const handleResetMessage = () => {
    setMessage("");
    setErrorMessage(""); // Reset error message
  };

  useEffect(() => {
  }, [token]);

  const quizzes = useMemo(() => [...(data || [])].sort((a, b) => b.id - a.id), [data]);

  return { quizzes, isLoading, changeQuizStatus, deleteQuiz, message, errorMessage, handleResetMessage };
};
