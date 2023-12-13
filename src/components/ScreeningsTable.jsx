import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Grid,
  TextField,
  Box,
  Modal,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import {
  getAllScreenings,
  getScreeningById,
  editScreening,
  deleteScreening,
  addScreening,
} from "../services/ScreeningServices.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Screenings = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [screeningId, setScreeningId] = useState("");
  const [price, setPrice] = useState("");
  const [screeningDate, setScreeningDate] = useState("");
  const [movieId, setMovieId] = useState("");
  const [hallId, setHallId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const getData = () => {
    getAllScreenings()
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (screeningId) => {
    setIsEditing(true);
    handleShow();
    getScreeningById(screeningId)
      .then((result) => {
        setScreeningId(screeningId);
        setPrice(result.price);
        setScreeningDate(result.screeningDate);
        setMovieId(result.movieId);
        setHallId(result.hallId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const screeningData = {
      screeningId: screeningId,
      price: price,
      screeningDate: screeningDate,
      movieId: movieId,
      hallId: hallId,
    };

    editScreening(screeningId, screeningData)
      .then(() => {
        getData();
        clear();
        toast.success("Screening was successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (screeningId) => {
    if (window.confirm("Are you sure you want to delete selected Screening?")) {
      deleteScreening(screeningId)
        .then((result) => {
          if (result === true) {
            toast.success("Screening was successfully deleted");
          }
          getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    clear();
    handleShow();
  };

  const handleCreate = async () => {
    const added = await addScreening(
      price,
      screeningDate,
      movieId,
      hallId
    );

    if (added) {
      handleClose();
      getData();
      clear();
      toast.success("New screening is added");
    } else {
      console.error("Failed to add screening");
    }
    clear();
  };

  const handleUpdateOrSave = () => {
    if (isEditing) {
      handleUpdate();
    } else {
      handleCreate();
    }
    handleClose();
  };

  const clear = () => {
    setScreeningId("");
    setPrice("");
    setScreeningDate("");
    setMovieId("");
    setHallId("");
  };

  return (
    <>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Button
          sx={{
            marginTop: "100px",
            marginLeft: "10px",
            width: "150px", // Зміна ширини кнопки
            backgroundColor: "#B00020", // Колір кнопки
            color: "white", // Колір тексту кнопки
            "&:hover": {
              backgroundColor: "#7f0019", // Колір при наведенні
            },
          }}
          variant="contained"
          onClick={handleAdd}
        >
          Add Screening
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="screening table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Screening Date</TableCell>
              <TableCell align="center">Movie ID</TableCell>
              <TableCell align="center">Hall ID</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.screeningId}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{formatDate(item.screeningDate)}</TableCell>
                <TableCell align="center">{item.movieId}</TableCell>
                <TableCell align="center">{item.hallId}</TableCell>
                <TableCell sx={{display:"flex", justifyContent:"center"}} >
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(item.screeningId)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.screeningId)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={show} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #B00020",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
           <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Container>
            <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
              <Typography variant="h6">
                {isEditing ? "Edit Screening" : "Add Screening"}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Enter Price"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="datetime-local"
                  variant="outlined"
                  value={screeningDate}
                  onChange={(e) => setScreeningDate(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Movie ID"
                  variant="outlined"
                  value={movieId}
                  onChange={(e) => setMovieId(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Hall ID"
                  variant="outlined"
                  value={hallId}
                  onChange={(e) => setHallId(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={handleUpdateOrSave}
              sx={{
                marginTop: "15px",
                width: "100%",
                backgroundColor: "#B00020",
                color: "white",
                "&:hover": {
                  backgroundColor: "#7f0019",
                },
              }}
            >
              {isEditing ? "Save Changes" : "Add Screening"}
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default Screenings;
