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
  getAllSeats,
  getSeatById,
  editSeat,
  deleteSeat,
  addSeat,
} from "../../services/SeatServices.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styles } from "../../styles/table.styles.js"

const SeatsTable = () => {
  const [show, setShow] = useState(false);
  const [seatsData, setSeatsData] = useState([]);
  const [seatId, setSeatId] = useState("");
  const [seatName, setSeatName] = useState("");
  const [hallId, setHallId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllSeats()
      .then((data) => {
        setSeatsData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (seatId) => {
    setIsEditing(true);
    handleShow();
    getSeatById(seatId)
      .then((result) => {
        setSeatId(seatId);
        setSeatName(result.seatName);
        setHallId(result.hallId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateSeat = () => {
    const seatData = {
      seatId: seatId,
      seatName: seatName,
      hallId: hallId,
    };

    editSeat(seatId, seatData)
      .then(() => {
        getData();
        clear();
        toast.success("Seat was successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (seatId) => {
    if (window.confirm("Are you sure you want to delete selected Seat?")) {
      deleteSeat(seatId)
        .then((result) => {
          if (result === true) {
            toast.success("Seat was successfully deleted");
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

  const handleCreateSeat = async () => {
    const added = await addSeat(seatName, hallId);

    if (added) {
      handleClose();
      getData();
      clear();
      toast.success("New seat was added");
    } else {
      console.error("Failed to add seat");
    }
  };

  const handleUpdateOrSave = () => {
    if (isEditing) {
      handleUpdateSeat();
    } else {
      handleCreateSeat();
    }
    handleClose();
  };

  const clear = () => {
    setSeatId("");
    setSeatName("");
    setHallId("");
  };

  return (
    <>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Button
          sx={styles.addButton}
          variant="contained"
          onClick={handleAdd}
        >
          Add Seat
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="seat table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Seat Name</TableCell>
              <TableCell align="center">Hall ID</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {seatsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.seatId}</TableCell>
                <TableCell align="center">{item.seatName}</TableCell>
                <TableCell align="center">{item.hallId}</TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(item.seatId)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.seatId)}>
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
          sx={styles.modalWrapper}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={styles.closeIcon}
          >
            <CloseIcon />
          </IconButton>
          <Container>
            <Box sx={styles.modalTitle}>
              <Typography variant="h6">
                {isEditing ? "Edit Seat" : "Add Seat"}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Seat Name"
                  variant="outlined"
                  value={seatName}
                  onChange={(e) => setSeatName(e.target.value)}
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
              sx={styles.editOrAddModalButton}
            >
              {isEditing ? "Save Changes" : "Add Seat"}
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default SeatsTable;
