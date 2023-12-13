import { useEffect, useState } from "react";
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
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import {
  getAllMovies,
  getMovieById,
  editMovie,
  deleteMovie,
  addMovie,
} from "../services/MovieServices.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MoviesTable = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [movieId, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [actors, setActors] = useState("");
  const [genres, setGenres] = useState("");
  const [directors, setDirectors] = useState("");
  const [movieLanguage, setMovieLanguage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const movieLanguages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Ukrainian",
    "Polish",
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllMovies()
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (movieId) => {
    setIsEditing(true);
    handleShow();
    getMovieById(movieId)
      .then((result) => {
        setId(movieId);
        setTitle(result.title);
        setDescription(result.description);
        setDuration(result.duration);
        setActors(result.actors);
        setGenres(result.genres);
        setDirectors(result.directors);
        setMovieLanguage(result.movieLanguage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const movieData = {
      movieId: movieId,
      title: title,
      description: description,
      duration: duration,
      actors: actors,
      genres: genres,
      directors: directors,
      movieLanguage: movieLanguage,
    };

    editMovie(movieId, movieData)
      .then(() => {
        getData();
        clear();
        toast.success("Movie was updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (movieId) => {
    if (window.confirm("Are you sure you want to delete selected Movie?")) {
      deleteMovie(movieId)
        .then((result) => {
          if (result === true) {
            toast.success("Movie was successfully deleted");
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
    const added = await addMovie(
      title,
      description,
      duration,
      actors,
      genres,
      directors,
      movieLanguage
    );

    if (added) {
      handleClose();
      getData();
      clear();
      toast.success("New movie is added");
    } else {
      console.error("Failed to add movie");
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
    setId("");
    setTitle("");
    setDescription("");
    setDuration("");
    setActors("");
    setGenres("");
    setDirectors("");
    setMovieLanguage("");
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
          Add Movie
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="movie table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Duration</TableCell>
              <TableCell align="center">Actors</TableCell>
              <TableCell align="center">Genres</TableCell>
              <TableCell align="center">Directors</TableCell>
              <TableCell align="center">Movie Language</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.movieId}</TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{item.duration}</TableCell>
                <TableCell>{item.actors}</TableCell>
                <TableCell>{item.genres}</TableCell>
                <TableCell>{item.directors}</TableCell>
                <TableCell align="center">{item.movieLanguage}</TableCell>
                <TableCell sx={{display:"flex", justifyContent:"center"}} >
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(item.movieId)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.movieId)}>
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
            border: "2px solid #B00020", // Бордовий бордер
            borderRadius: "8px", // Заокруглені кути
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
                {isEditing ? "Edit Movie" : "Add Movie"}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Enter Duration"
                  variant="outlined"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Actors"
                  variant="outlined"
                  value={actors}
                  onChange={(e) => setActors(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Genres"
                  variant="outlined"
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Directors"
                  variant="outlined"
                  value={directors}
                  onChange={(e) => setDirectors(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Select Movie Language"
                  variant="outlined"
                  value={movieLanguage}
                  onChange={(e) => setMovieLanguage(e.target.value)}
                  fullWidth
                >
                  {movieLanguages.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
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
              {isEditing ? "Save Changes" : "Add Movie"}
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default MoviesTable;
