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
  getAllTickets,
  getTicketById,
  editTicket,
  deleteTicket,
  addTicket,
} from "../../services/TicketServices.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styles } from "../../styles/table.styles.js"

const TicketsTable = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [seatId, setSeatId] = useState("");
  const [screeningId, setScreeningId] = useState("");
  const [userId, setUserId] = useState("");
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
    getAllTickets()
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (ticketId) => {
    setIsEditing(true);
    handleShow();
    getTicketById(ticketId)
      .then((result) => {
        setTicketId(ticketId);
        setPurchaseDate(result.purchaseDate);
        setSeatId(result.seatId);
        setScreeningId(result.screeningId);
        setUserId(result.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const ticketData = {
      ticketId: ticketId,
      purchaseDate: purchaseDate,
      seatId: seatId,
      screeningId: screeningId,
      userId: userId,
    };

    editTicket(ticketId, ticketData)
      .then(() => {
        getData();
        clear();
        toast.success("Ticket was successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (ticketId) => {
    if (window.confirm("Are you sure you want to delete selected Ticket?")) {
      deleteTicket(ticketId)
        .then((result) => {
          if (result === true) {
            toast.success("Ticket was successfully deleted");
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
    const added = await addTicket(
      purchaseDate,
      seatId,
      screeningId,
      userId
    );

    if (added) {
      handleClose();
      getData();
      clear();
      toast.success("New ticket was added");
    } else {
      console.error("Failed to add ticket");
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
    setTicketId("");
    setPurchaseDate("");
    setSeatId("");
    setScreeningId("");
    setUserId("");
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
          Add Ticket
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="ticket table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Purchase Date</TableCell>
              <TableCell align="center">Seat ID</TableCell>
              <TableCell align="center">Screening ID</TableCell>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.ticketId}</TableCell>
                <TableCell align="center">{formatDate(item.purchaseDate)}</TableCell>
                <TableCell align="center">{item.seatId}</TableCell>
                <TableCell align="center">{item.screeningId}</TableCell>
                <TableCell align="center">{item.userId}</TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(item.ticketId)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.ticketId)}>
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
                {isEditing ? "Edit Ticket" : "Add Ticket"}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="datetime-local"
                  variant="outlined"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Seat ID"
                  variant="outlined"
                  value={seatId}
                  onChange={(e) => setSeatId(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter Screening ID"
                  variant="outlined"
                  value={screeningId}
                  onChange={(e) => setScreeningId(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter User ID"
                  variant="outlined"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={handleUpdateOrSave}
              sx={styles.editOrAddModalButton}
            >
              {isEditing ? "Save Changes" : "Add Ticket"}
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default TicketsTable;
