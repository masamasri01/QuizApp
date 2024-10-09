import React from "react";
import { Card, CardContent, CardActions, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative", // Set the card position to relative
  margin: theme.spacing(2),
  borderRadius: "15px",
  boxShadow: theme.shadows[5],
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[8],
  },
}));

const Title = styled(Typography)(() => ({
  marginBottom: "8px",
  fontWeight: 600,
}));

const Subtitle = styled(Typography)(() => ({
  margin: "4px 0",
}));

const BoldText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  display: "inline",
}));

const EditButton = styled(IconButton)(() => ({
  position: "absolute", // Absolute position for the edit button
  top: "8px", // Adjust as necessary for vertical alignment
  right: "8px", // Adjust as necessary for horizontal alignment
}));

export const EditQuizCard = ({ quizData, onEdit }) => {
  return (
    <StyledCard>
      <EditButton onClick={onEdit} aria-label="edit quiz">
        <EditIcon />
      </EditButton>
      <CardContent>
        <Title variant="h5">Quiz Info</Title>
        <Subtitle variant="subtitle1">
          <BoldText>Title:</BoldText> {quizData.title}
        </Subtitle>
        <Subtitle variant="subtitle1">
          <BoldText>Description:</BoldText> {quizData.description}
        </Subtitle>
        <Subtitle variant="subtitle1">
          <BoldText>Time Limit:</BoldText> {quizData.time_limit} mins
        </Subtitle>
        <Subtitle variant="subtitle1">
          <BoldText>Status:</BoldText> {quizData.status === "1" ? "Active" : "Inactive"}
        </Subtitle>
      </CardContent>
    </StyledCard>
  );
};
