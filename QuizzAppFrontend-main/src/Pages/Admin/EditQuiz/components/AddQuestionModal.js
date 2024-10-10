import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Snackbar,
} from "@mui/material";

const questionTypes = [
  { value: "Multiple Choice", label: "Multiple Choice" },
  { value: "Checkbox", label: "Checkbox" },
];

export const AddQuestionModal = ({ open, onClose, onSubmit }) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("");

  const handleSubmit = () => {
    const questionData = {
      question_text: questionText,
      question_type: questionType,
    };
    onSubmit(questionData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Question</DialogTitle>
      <DialogContent>
        <TextField
          label="Question Text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Question Type"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          fullWidth
          margin="normal"
        >
          {questionTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add Question
        </Button>
      </DialogActions>
    </Dialog>
  );
};
