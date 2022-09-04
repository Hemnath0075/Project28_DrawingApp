import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";

import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import Signup from "./Pages/Signup";
import { verifyToken } from "./redux/features/user";

function App() {

  const isAuth=useSelector((state)=>state.users.status);
  console.log(isAuth)
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/home" element={isAuth?<Home/>:<Navigate to="/login" replace/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
