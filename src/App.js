import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage'
import WelcomeBlock from './components/WelcomeBlock/WelcomeBlock'
import MoviesTable from './components/MoviesTable/MoviesTable'
import ScreeningsTable from './components/ScreeningsTable/ScreeningsTable'
import TicketsTable from './components/TicketsTable/TicketsTable'
import HallsTable from './components/HallsTable/HallsTable'
import SeatsTable from './components/SeatsTable/SeatsTable'
import UsersTable from './components/UsersTable/UsersTable'

const App = () => {
  return (   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<WelcomeBlock />} />
            <Route path="movies" element={<MoviesTable />} />
            <Route path="screenings" element={<ScreeningsTable />} />       
            <Route path="halls" element={<HallsTable />} />
            <Route path="seats" element={<SeatsTable />} />
            <Route path="tickets" element={<TicketsTable />} />
            <Route path="users" element={<UsersTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
