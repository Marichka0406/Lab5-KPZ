import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, List, ListItem } from "@mui/material";
import "../styles/styles.scss";

const MainPage = () => {
  return (
    <>
      <AppBar>
        <Toolbar className="navbar-wrapper">
          <List className="navbar-elements">
            <ListItem className="navbar-element">
              <Link to="/">Home</Link>
            </ListItem>
            <ListItem className="navbar-element">
              <Link to="/movies">Movies</Link>
            </ListItem>
            <ListItem className="navbar-element">
              <Link to="/screenings">Screenings</Link>
            </ListItem>
            <ListItem className="navbar-element">
              <Link to="/halls">Halls</Link>
            </ListItem>
            <ListItem className="navbar-element">
              <Link to="/seats">Seats</Link>
            </ListItem>
            <ListItem className="navbar-element">
              <Link to="/tickets">Tickets</Link>
            </ListItem>
            <ListItem className="navbar-element">
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
