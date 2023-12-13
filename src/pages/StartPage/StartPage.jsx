import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CinemaTablesPage from "../CinemaTablesPage/CinemaTablesPage";
import WelcomeBlock from "../../components/WelcomeBlock/WelcomeBlock";
import MoviesTable from "../../components/MoviesTable/MoviesTable";
import ScreeningsTable from "../../components/ScreeningsTable/ScreeningsTable";
import TicketsTable from "../../components/TicketsTable/TicketsTable";
import HallsTable from "../../components/HallsTable/HallsTable";
import SeatsTable from "../../components/SeatsTable/SeatsTable";
import UsersTable from "../../components/UsersTable/UsersTable";
import LoginPage from "../LoginPage/LoginPage";

const StartPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (isAuthenticated) => {
    setIsAuthenticated(isAuthenticated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CinemaTablesPage />}>
          <Route index element={<WelcomeBlock />} />
          <Route path="movies" element={isAuthenticated ? <MoviesTable /> : <Navigate to="/login" />} />
          <Route path="screenings" element={isAuthenticated ? <ScreeningsTable /> : <Navigate to="/login" />} />
          <Route path="tickets" element={isAuthenticated ? <TicketsTable /> : <Navigate to="/login" />} />
          <Route path="halls" element={isAuthenticated ? <HallsTable /> : <Navigate to="/login" />} />
          <Route path="seats" element={isAuthenticated ? <SeatsTable /> : <Navigate to="/login" />} />
          <Route path="users" element={isAuthenticated ? <UsersTable /> : <Navigate to="/login" />} />
          <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default StartPage;
