import React, { useState, useEffect } from "react";
import { Modal, TextField, Switch, Box, Typography, Button, FormControlLabel } from "@mui/material";

export const EditQuizModal = ({ open, onClose, quizData, onSubmit }) => {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTimeLimit, setEditedTimeLimit] = useState(0);
  const [editedStatus, setEditedStatus] = useState(true);

  useEffect(() => {
    if (quizData) {
      setEditedTitle(quizData.title);
      setEditedDescription(quizData.description);
      setEditedTimeLimit(quizData.time_limit);
      setEditedStatus(quizData.status === "1");
    }
  }, [quizData]);

  const handleSubmit = () => {
    onSubmit({
      title: editedTitle,
      description: editedDescription,
      time_limit: editedTimeLimit,
      status: editedStatus ? 1 : 0,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Quiz
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          rows={4}
          multiline
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <TextField
          label="Time Limit (mins)"
          fullWidth
          type="number"
          margin="normal"
          value={editedTimeLimit}
          onChange={(e) => setEditedTimeLimit(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={editedStatus}
              onChange={(e) => setEditedStatus(e.target.checked)}
              color="success"
            />
          }
          label={`Status: ${editedStatus ? "Active" : "Inactive"}`}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
