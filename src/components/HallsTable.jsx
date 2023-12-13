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
  Typography,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import {
  getAllHalls,
  getHallById,
  editHall,
  deleteHall,
  addHall,
} from "../services/HallServices.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HallsTable = () => {
  const [show, setShow] = useState(false);
  const [hallsData, setHallsData] = useState([]);
  const [hallId, setHallId] = useState(""); 
  const [hallName, setHallName] = useState(""); 
  const [seatsQuantity, setSeatsQuantity] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData(); 
  }, []);

  const getData = () => {
    getAllHalls()
      .then((data) => {
        setHallsData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleEdit = (hallId) => {
    setIsEditing(true);
    handleShow();
    getHallById(hallId)
      .then((result) => {
        setHallId(hallId);
        setHallName(result.hallName);
        setSeatsQuantity(result.seatsQuantity);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleUpdateHall = () => {
    const hallData = {
      hallId: hallId,
      hallName: hallName,
      seatsQuantity: seatsQuantity,
      // Додайте решту полів для залу тут
    };
  
    editHall(hallId, hallData)
      .then(() => {
        getData();
        clear();
        toast.success("Hall updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleDelete = (hallId) => {
    if (window.confirm("Are you sure you want to delete selected Hall?")) {
      deleteHall(hallId)
        .then((result) => {
          if (result === true) {
            toast.success("Hall was successfully deleted");
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
  
  const handleCreateHall = async () => {
    const added = await addHall(
      hallName,
      seatsQuantity,
      // Додайте решту полів для залу тут
    );
  
    if (added) {
      handleClose();
      getData();
      clear();
      toast.success("New hall is added");
    } else {
      console.error("Failed to add hall");
    }
  };
  
  const handleUpdateOrSave = () => {
    if (isEditing) {
      handleUpdateHall();
    } else {
      handleCreateHall();
    }
    handleClose();
  };
  
  const clear = () => {
    setHallId("");
    setHallName("");
    setSeatsQuantity("");
  
  };
  
  return (
    <>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Button
          sx={{
            marginTop: "100px",
            marginLeft: "10px",
            width: "150px",
            backgroundColor: "#B00020",
            color: "white",
            "&:hover": {
              backgroundColor: "#7f0019",
            },
          }}
          variant="contained"
          onClick={handleAdd}
        >
          Add Hall
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="hall table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Hall Name</TableCell>
              <TableCell align="center">Seats Quantity</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {hallsData.map((item, index) => (
              <TableRow key={index} >
                <TableCell align="center">{item.hallId}</TableCell>
                <TableCell align="center">{item.hallName}</TableCell>
                <TableCell align="center">{item.seatsQuantity}</TableCell>
                <TableCell sx={{display:"flex", justifyContent:"center"}} >
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(item.hallId)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.hallId)}>
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
                {isEditing ? "Edit Hall" : "Add Hall"}
              </Typography>
            </Box>
            <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="text"
            label="Enter Hall Name"
            variant="outlined"
            value={hallName}
            onChange={(e) => setHallName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            label="Enter Seats Quantity"
            variant="outlined"
            value={seatsQuantity}
            onChange={(e) => setSeatsQuantity(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
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
              {isEditing ? "Save Changes" : "Add Hall"}
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );

};

export default HallsTable;