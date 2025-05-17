import { Route, Routes, useNavigate } from "react-router-dom";
 import Register from "./pages/Register"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
 
const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
      if(localStorage.getItem("userLoggedIn")){
        navigate("/dashboard")
      }else{
        navigate("/login")
      }
  },[])
  return (
    <>
    
     <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </div>  
    </>
  );
};

export default App;
