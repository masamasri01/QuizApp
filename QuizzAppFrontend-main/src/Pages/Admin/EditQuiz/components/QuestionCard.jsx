import React, { useEffect, useState } from "react"; 
import { Card, CardContent, Typography, Button, Box, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Switch, Checkbox, Radio } from "@mui/material"; 
import { fetchOptionsAPI, addOptionAPI, editQuestionAPI } from "./api";

export const QuestionCard = ({ question, onEdit, onDelete }) => {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newOptionText, setNewOptionText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [editedQuestionText, setEditedQuestionText] = useState(question.question_text);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const optionsData = await fetchOptionsAPI(question.question_id);
        setOptions(optionsData);
      } catch (error) {
        console.error("Error fetching question options", error);
      }
    };
    fetchOptions();
  }, [question.question_id]);

  const handleAddOption = async () => {
    try {
      await addOptionAPI(question.question_id, newOptionText, isCorrect);
      setNewOptionText(""); // Reset input field
      setIsCorrect(false); // Reset switch
      setOpen(false); // Close dialog
      const optionsData = await fetchOptionsAPI(question.question_id);
      setOptions(optionsData);
    } catch (error) {
      console.error("Error adding new option", error);
    }
  };

  const handleEditQuestion = async () => {
    try {
      await editQuestionAPI(question.question_id, editedQuestionText);
      setOpenEditModal(false); // Close edit modal
    } catch (error) {
      console.error("Error updating question text", error);
    }
  };

  const renderOptions = () => {
    return options.map((option) => (
      <Box key={option.option_id}>
        {question.question_type === "Multiple Choice" ? (
          <FormControlLabel
            value={option.option_id}
            control={<Radio checked={option.is_correct} />}
            label={option.option_text}
          />
        ) : (
          <FormControlLabel
            key={option.option_id}
            control={<Checkbox checked={option.is_correct} />}
            label={option.option_text}
          />
        )}
      </Box>
    ));
  };

  const hasCorrectAnswer = options.some(option => option.is_correct);

  return (
    <Card sx={{ marginBottom: 2, borderRadius: "15px" }} >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">{question.question_text}</Typography>
          <Typography variant="body2" color="textSecondary">{question.question_type}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2">Options:</Typography>
          <Box mt={1}>{renderOptions()}</Box>
          <Button 
            variant="outlined" 
            onClick={() => setOpen(true)} 
            sx={{ marginTop: 2 }}
          >
            Add Option
          </Button>
        </Box>
      </CardContent>
      <Box display="flex" justifyContent="flex-end" padding="16px">
        <Button onClick={() => setOpenEditModal(true)} color="primary" sx={{ marginRight: 1 }}>
          Edit
        </Button>
        <Button onClick={() => onDelete(question.question_id)} color="secondary">
          Delete
        </Button>
      </Box>

      {/* Dialog for adding new option */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Option</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Option Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newOptionText}
            onChange={(e) => setNewOptionText(e.target.value)}
            sx={{ minWidth: "500px" }} // Increase width for better layout
          />
          <FormControlLabel
            control={<Switch checked={isCorrect} onChange={(e) => setIsCorrect(e.target.checked)} disabled={hasCorrectAnswer && question.question_type === "Multiple Choice"} />}
            label="Correct Answer"
            disabled={hasCorrectAnswer && question.question_type === "Multiple Choice"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddOption} color="primary" disabled={!newOptionText}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Question Text Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Question Text</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Question Text"
            type="text"
            fullWidth
            variant="outlined"
            value={editedQuestionText}
            onChange={(e) => setEditedQuestionText(e.target.value)}
            sx={{ minWidth: "500px" }} // Increase width for better layout
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="primary">Cancel</Button>
          <Button onClick={handleEditQuestion} color="primary" disabled={!editedQuestionText}>Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
