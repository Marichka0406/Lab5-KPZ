import backgroundImage from "../../assets/welcome.jpg";

export const styles = {
  welcomeBlockWrapper: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
};
