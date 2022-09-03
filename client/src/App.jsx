import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ForgotPassword from './Pages/ForgotPassword';


import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
