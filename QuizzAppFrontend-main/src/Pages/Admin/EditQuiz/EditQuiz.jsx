import React, { useState } from "react";
import { Box, Snackbar, Typography } from "@mui/material";
import { EditQuizModal } from "./components/EditQuizModal";
import { useUpdateQuiz } from "./useUpdateQuiz";
import { useFetchQuizDetails } from "./useFetchQuizDetails";
import { EditQuizCard } from "./components/EditQuizCard";
import { AddQuestionModal } from "./components/AddQuestionModal";
import { useAddQuestion } from "./useAddQuestion"; 
import { useDeleteQuestion } from "./useDeleteQuestion"; // Import the new hook
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { QuestionsList } from "./components/QuestionsList";

export const EditQuiz = () => {
  const { id: quizId } = useParams();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState({ message: "", type: "" });
  const handleResetMessages = () => setFlashMessage({ message: "", type: "" });

  const { data: quizData, isLoading, refetch } = useFetchQuizDetails(quizId);
  const { mutate: updateQuiz } = useUpdateQuiz(quizId, setFlashMessage, refetch);
  const { addQuestion, flashMessage: questionFlashMessage } = useAddQuestion(quizId, refetch);
  const { deleteQuestion, flashMessage: deleteFlashMessage } = useDeleteQuestion(quizId, refetch); // Use the delete hook

  const handleEditSubmit = (updatedQuiz) => {
    updateQuiz(updatedQuiz);
    setEditModalOpen(false);
  };

  const handleAddQuestionSubmit = (questionData) => {
    addQuestion(questionData);
    setAddQuestionModalOpen(false);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box display="flex" justifyContent="space-between" padding="20px" width={"80vw"}>
      <Box flex={1} marginRight="20px" marginTop={"42px"} width={"800px"}>
        <EditQuizCard quizData={quizData} onEdit={() => setEditModalOpen(true)} />
      </Box>

      <Box flex={1} marginLeft="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Questions</Typography>
          <Button color="primary" onClick={() => setAddQuestionModalOpen(true)}>
            Add Question
          </Button>
        </Box>
        <Box sx={{marginTop: "20px"}}>
        {quizData?.questions && (
          <QuestionsList
            questions={quizData.questions} 
            onEdit={(question) => {
                // Handle edit logic
            }} 
            onDelete={deleteQuestion} 
          />
        )}
        </Box>
      </Box>

      <EditQuizModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        quizData={quizData}
        onSubmit={handleEditSubmit}
      />

      <AddQuestionModal
        open={isAddQuestionModalOpen}
        onClose={() => setAddQuestionModalOpen(false)}
        onSubmit={handleAddQuestionSubmit}
      />

      {/* Flash Messages */}
      {(flashMessage.type || questionFlashMessage.type || deleteFlashMessage.type) && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={handleResetMessages}
          message={flashMessage.message || questionFlashMessage.message || deleteFlashMessage.message}
        />
      )}
    </Box>
  );
};
