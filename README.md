# Online Quiz Management System

## **Project Overview**

This project is an online quiz management system designed to create and administer quizzes efficiently. Examiners can create and manage quizzes, as well as monitor participants' results and analyze the performance of their quizzes.

Participants (referred to as **Respondents**) can take quizzes without the need to create an account or log in. Once they complete a quiz, they can instantly view their score. Examiners can also see the overall results, including the number of respondents and the average score.

## **Key Features**

- **Admin Panel:**
  - Manage users (Examiners and Respondents).
  - Share quizzes with any respondent.
  
- **Examiner Capabilities:**
  - Create and manage quizzes with two question types: 
    - **Multiple Choice** (single answer).
    - **Checkbox** (multiple answers).
  - View quiz results, including the average score and the total number of respondents.
  
- **Quiz Taking:**
  - Respondents can take quizzes without needing to register or log in.
  - Quizzes display results immediately after submission.
  
- **Result Analysis:**
  - Examiners can see an aggregated report of quiz results, including average scores.
  - Simple data analysis features to evaluate quiz effectiveness.

## **Technologies Used**

- **Backend**: Laravel framework for handling quiz management, user management, and data storage (using SQL Server).
- **Frontend**: React.js for building responsive and interactive quiz interfaces.
- **Database**: SQL Server for managing and storing quiz data and user responses.
- **API Documentation**: Integrated API documentation for quiz creation and response submission using tools like Postman.


#### **UML Class Diagram**
![image](https://github.com/user-attachments/assets/77fe1807-4ff5-4fdb-a696-50d66039f873)



## **Epics and User Stories**

- As an **Examiner**, I want to create quizzes so that I can assess respondents' knowledge.
- As an **Examiner**, I want to edit or delete quizzes so that I can maintain accurate content.
- As an **Examiner**, I want to create multiple-choice and checkbox questions so that I can design diverse quizzes.
- As a **Respondent**, I want to take quizzes without logging in so that I can easily participate and provide my answers.
- As an **Examiner**, I want to view quiz results, including the average scores and number of respondents, so that I can analyze performance.
