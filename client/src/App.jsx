import { useSelector } from "react-redux";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";

import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import Signup from "./Pages/Signup";

function App() {
  const isAuth=useSelector((state)=>state.users.status);
  console.log(isAuth)
  // useEffect(()=>{
  //   console.log("the use effect hook")
  //   if(!isAuth){ 
  //       <Navigate to='/'replace/>
  //   }
  // },[isAuth])
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
