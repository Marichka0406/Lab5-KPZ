import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import MainPage from './components/MainPage'
import WelcomeBlock from './components/WelcomeBlock'
import MoviesTable from './components/MoviesTable'
import ScreeningsTable from './components/ScreeningsTable'
import TicketsTable from './components/TicketsTable'
import HallsTable from './components/HallsTable'
import SeatsTable from './components/SeatsTable'
import UsersTable from './components/UsersTable'

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
