import { Box, Switch, CircularProgress, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAllQuizzes } from "./useAllQuizzes"; // Custom hook
import { useEffect, useState } from "react";
import { FlashMessage } from "../../AuthPages/FlashMessage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export const Quizzes = () => {
  const { quizzes, isLoading, changeQuizStatus, deleteQuiz, handleResetMessage, message, errorMessage } = useAllQuizzes();
  const [quizList, setQuizList] = useState(quizzes || []);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    setQuizList(quizzes || []);
  }, [quizzes]);

  const handleToggleStatus = (e, id) => {
    e.stopPropagation();
    changeQuizStatus({ quizId: id });
    setQuizList((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === id ? { ...quiz, status: quiz.status === "1" ? "0" : "1" } : quiz
      )
    );
  };

  const handleDeleteQuiz = () => {
    if (quizToDelete) {
      deleteQuiz({ quizId: quizToDelete });
      setQuizList((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizToDelete));
      setOpenDeleteModal(false);
    }
  };

  const handleOpenDeleteModal = (quizId) => {
    setQuizToDelete(quizId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setQuizToDelete(null);
  };
  const handleNavigateToAddPage = () => {
    navigate("/create-quiz");
  }

  const handleEditQuiz = (id) => {
    navigate(`/edit-quiz/${id}`);
  }


  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90, headerClassName: "header" },
    { field: "title", headerName: "Title", width: 200, headerClassName: "header" },
    { field: "description", headerName: "Description", width: 300, headerClassName: "header" },
    { field: "time_limit", headerName: "Time Limit (mins)", width: 150, headerClassName: "header" },
    {
      field: "status",
      headerName: "Active",
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={params.row.status === "1"}
          onChange={(e) => handleToggleStatus(e, params.row.id)}
          color="primary"
        />
      ),
      headerClassName: "header",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditQuiz(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleOpenDeleteModal(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
      headerClassName: "header",
    },
  ];

  return (
    <Box>
      <Box marginTop="40px"  display="flex" justifyContent="space-between" alignItems="center" height="fit-content" width={"100%"}>
      <Typography  variant="h4" align="center" color={"#252F41"} textAlign={"start"}>
        Quizzes
      </Typography>
      <Button color="success" variant="contained"  onClick={handleNavigateToAddPage}>
        Add Quiz
      </Button>
    </Box>
      {message && <FlashMessage class={"success"} message={message} delete={handleResetMessage} />}
      {errorMessage && <FlashMessage class={"danger"} message={errorMessage} delete={handleResetMessage} />}
      <Box
        p={2}
        height={"fit-content"}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          boxShadow: 1,
          bgcolor: "background.paper",
          width: "70vw",
          marginTop: "40px",
        }}
      >
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[7, 15, 20]}
          rows={quizList}
          columns={columns}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              color: "#333",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": {
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #e0e0e0",
            },
            "& .header": {
              fontSize: "16px",
              color: "#252F41",
            },
          }}
        />
      </Box>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this quiz?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteQuiz} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
