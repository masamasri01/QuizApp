import React from "react";
import { QuestionCard } from "./QuestionCard";

export const QuestionsList = ({ questions, onEdit, onDelete }) => {
  return (
    <>
      {questions.map((question) => (
        <QuestionCard 
          key={question.question_id} 
          question={question} 
          onEdit={onEdit} 
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
