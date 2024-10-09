import React, { useEffect, useState } from "react";
import { fetchQuizQuestions, fetchQuestionOptions } from "./api";
import { Card, Button, Checkbox, Radio, FormControlLabel, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useParams } from "react-router-dom";

export const UserQuizPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState({
    correctAnswers: 6,
    wrongAnswers: 3,
    unansweredQuestions: 1,
  });

  useEffect(() => {
    const fetchQuestionsAndOptions = async () => {
      const questionsData = await fetchQuizQuestions(id);
      for (const question of questionsData) {
        const optionsData = await fetchQuestionOptions(question.question_id);
        question.options = optionsData;
      }
      setQuestions(questionsData);
    };

    fetchQuestionsAndOptions();
  }, [id]);

  const handleOptionChange = (questionId, optionId, isMultipleChoice) => {
    setUserAnswers((prevAnswers) => {
      const prevOptions = prevAnswers[questionId] || [];
      let updatedOptions;

      if (isMultipleChoice) {
        updatedOptions = prevOptions.includes(optionId)
          ? prevOptions.filter((id) => id !== optionId)
          : [...prevOptions, optionId];
      } else {
        updatedOptions = [optionId];
      }

      return {
        ...prevAnswers,
        [questionId]: updatedOptions,
      };
    });

    setFlags((prevFlags) => ({
      ...prevFlags,
      [questionId]: false,
    }));
  };

  const handleSubmitQuiz = () => {
    let unansweredQuestions = {};
    let correctAnswers = 0;
    let wrongAnswers = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question.question_id];
      if (!userAnswer || userAnswer.length === 0) {
        unansweredQuestions[question.question_id] = true;
      } else {
        const correctOptions = question.options.filter((option) => option.is_correct).map((opt) => opt.option_id);
        if (JSON.stringify(correctOptions) === JSON.stringify(userAnswer)) {
          correctAnswers++;
        } else {
          wrongAnswers++;
        }
      }
    });

    setFlags(unansweredQuestions);
    
    setResult({
      correctAnswers,
      wrongAnswers,
      unansweredQuestions: Object.keys(unansweredQuestions).length,
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Design Pattern Quiz
      </Typography>
      {questions.map((question) => (
        <Card key={question.question_id} sx={{ marginBottom: 3, padding: 2, borderRadius: "15px" }}>
          <Typography variant="h6">{question.question_text}</Typography>
          {question.options.map((option) => (
            <Box key={option.option_id} display="flex" alignItems="center" mt={1}>
              {question.question_type === "Multiple Choice" ? (
                <FormControlLabel
                  control={
                    <Radio
                      checked={userAnswers[question.question_id]?.includes(option.option_id) || false}
                      onChange={() => handleOptionChange(question.question_id, option.option_id, false)}
                    />
                  }
                  label={option.option_text}
                />
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userAnswers[question.question_id]?.includes(option.option_id) || false}
                      onChange={() => handleOptionChange(question.question_id, option.option_id, true)}
                    />
                  }
                  label={option.option_text}
                />
              )}
            </Box>
          ))}
          {flags[question.question_id] && (
            <Typography color="error" variant="body2">
              * This question is unanswered.
            </Typography>
          )}
        </Card>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmitQuiz}>
        Submit Quiz
      </Button>

      {/* Modal to show the result */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Quiz Results</DialogTitle>
        <DialogContent>
          <Typography>Correct Answers: {result.correctAnswers}</Typography>
          <Typography>Wrong Answers: {result.wrongAnswers}</Typography>
          <Typography>Unanswered Questions: {result.unansweredQuestions}</Typography>
          <Typography variant="h6">
            Result: {result.correctAnswers >= questions.length / 2 ? "Pass" : "Fail"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
