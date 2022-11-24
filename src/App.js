import './App.css';
import StarWarsList from './Pages/StarWarsList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StarWarDetails from './Pages/StarWarDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/StarwarDetails/:id' element={<StarWarDetails />} />
        <Route path='/' element={<StarWarsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
