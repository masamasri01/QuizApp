import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { useCreateQuiz } from "./useCreateQuiz";

export const CreateQuiz = ({ onQuizCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [status, setStatus] = useState(true);
  const [errors, setErrors] = useState({});

  const examinerId = localStorage.getItem("examinerId") || 1;

  const {
    addQuiz,
    errorMessage,
    successMessage,
    handleResetMessages,
  } = useCreateQuiz(localStorage.getItem("token"), onQuizCreated);

  const validateForm = () => {
    const validationErrors = {};
    
    if (!title) {
      validationErrors.title = "Title is required";
    }

    if (!description) {
      validationErrors.description = "Description is required";
    }

    if (!timeLimit || timeLimit <= 0) {
      validationErrors.timeLimit = "Time limit must be a positive number";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    const quizData = {
      title,
      description,
      examiner_id: examinerId,
      time_limit: timeLimit,
      status: status ? 1 : 0,
    };
    addQuiz(quizData);
  };

  return (
    <Card sx={{ maxWidth: 900, margin: "40px auto", boxShadow: 3, borderRadius: "15px" }}>
      <Typography variant="h5" align="center" color={"#252F41"} margin={"15px"}>
        Create Quiz
      </Typography>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={handleResetMessages}
                margin="normal"
                sx={{ bgcolor: "background.paper" }}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time Limit (mins)"
                variant="outlined"
                type="number"
                fullWidth
                required
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                onFocus={handleResetMessages}
                margin="normal"
                sx={{ bgcolor: "background.paper" }}
                error={!!errors.timeLimit}
                helperText={errors.timeLimit}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={handleResetMessages}
                margin="normal"
                sx={{ bgcolor: "background.paper" }}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Switch
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                color="success"
              />
            }
            label={`Status: ${status ? "Active" : "Inactive"}`}
            sx={{ marginTop: 2 }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ paddingInlineStart: "15px", paddingBottom: "15px" }}>
        <Button
          type="submit"
          color="success"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
        >
          Create Quiz
        </Button>
      </CardActions>

      {successMessage && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={handleResetMessages}
          message={successMessage}
        />
      )}
      {errorMessage && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={handleResetMessages}
          message={errorMessage}
        />
      )}
    </Card>
  );
};
