import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';


import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
