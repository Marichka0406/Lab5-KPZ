export const styles = {
  addButton: {
    marginTop: "100px",
    marginLeft: "10px",
    width: "150px",
    backgroundColor: "#B00020",
    color: "white",
    "&:hover": {
      backgroundColor: "#7f0019",
    },
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: "15px",
  },
  editOrAddModalButton: {
    marginTop: "15px",
    width: "100%",
    backgroundColor: "#B00020",
    color: "white",
    "&:hover": {
      backgroundColor: "#7f0019",
    },
  },
  modalWrapper: {
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
  },
  closeIcon:{
    position: "absolute",
    right: 8,
    top: 8
  }
};
