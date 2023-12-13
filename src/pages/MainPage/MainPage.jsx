import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, List, ListItem } from "@mui/material";
import { styles } from "../MainPage/MainPage.styles" 

const MainPage = () => {
  return (
    <>
      <AppBar>
        <Toolbar sx={styles.navbarWrapper}>
          <List sx={styles.navbarElements}>
            <ListItem sx={styles.navbarElement}>
              <Link to="/">Home</Link>
            </ListItem>
            <ListItem sx={styles.navbarElement}>
              <Link to="/movies">Movies</Link>
            </ListItem>
            <ListItem sx={styles.navbarElement}>
              <Link to="/screenings">Screenings</Link>
            </ListItem>
            <ListItem sx={styles.navbarElement}>
              <Link to="/halls">Halls</Link>
            </ListItem>
            <ListItem sx={styles.navbarElement}>
              <Link to="/seats">Seats</Link>
            </ListItem>
            <ListItem sx={styles.navbarElement}>
              <Link to="/tickets">Tickets</Link>
            </ListItem>
            <ListItem sx={styles.navbarElement}>
              <Link to="/users">Users</Link>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
export default MainPage;
