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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import {
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  addUser,
} from "../../services/UserService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styles } from "../../styles/table.styles.js"

const UsersTable = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllUsers()
      .then((data) => {
        setUserData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (userId) => {
    setIsEditing(true);
    handleShow();
    getUserById(userId)
      .then((result) => {
        setUserId(userId);
        setUserName(result.userName);
        setEmailAdress(result.emailAdress);
        setPhoneNumber(result.phoneNumber);
        setPassword(result.password);
        setUserRole(result.userRole);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = () => {
    const userData = {
      userId: userId,
      userName: userName,
      emailAdress: emailAdress,
      phoneNumber: phoneNumber,
      password: password,
      userRole: userRole,
    };

    editUser(userId, userData)
      .then(() => {
        getData();
        clear();
        toast.success("User was successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete selected User?")) {
      deleteUser(userId)
        .then((result) => {
          if (result === true) {
            toast.success("User was successfully deleted");
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

  const handleCreateUser = async () => {
    const added = await addUser(
      userName,
      emailAdress,
      phoneNumber,
      password,
      userRole
    );

    if (added) {
      handleClose();
      getData();
      clear();
      toast.success("New user was added");
    } else {
      console.error("Failed to add user");
    }
  };

  const handleUpdateOrSave = () => {
    if (isEditing) {
      handleUpdateUser();
    } else {
      handleCreateUser();
    }
    handleClose();
  };

  const clear = () => {
    setUserId("");
    setUserName("");
    setEmailAdress("");
    setPhoneNumber("");
    setPassword("");
    setUserRole("");
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
          Add User
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Email Address</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Password</TableCell>
              <TableCell align="center">User Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.userId}</TableCell>
                <TableCell align="center">{item.userName}</TableCell>
                <TableCell align="center">{item.emailAdress}</TableCell>
                <TableCell align="center">{item.phoneNumber}</TableCell>
                <TableCell align="center">{item.password}</TableCell>
                <TableCell align="center">{item.userRole}</TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(item.userId)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.userId)}>
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
                {isEditing ? "Edit User" : "Add User"}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter User Name"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Enter Email Address"
                  variant="outlined"
                  value={emailAdress}
                  onChange={(e) => setEmailAdress(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="tel"
                  label="Enter Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Enter Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>User Role</InputLabel>
                  <Select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    label="User Role"
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Client">Client</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={handleUpdateOrSave}
              sx={styles.editOrAddModalButton}
            >
              {isEditing ? "Save Changes" : "Add User"}
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default UsersTable;
