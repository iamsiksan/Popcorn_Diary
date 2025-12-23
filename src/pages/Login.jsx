import React from "react";
import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login({setLoggedIn}) {
  const navigate = useNavigate()
   const handleLogin = () => {
    
    setLoggedIn(true);
    
    
    navigate('/', {replace: true})
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-dark text-white  text-center">
      <button onClick={handleLogin} className="mb-10 px-5 py-2 text-white bg-accent rounded-lg cursor-pointer">
        Login
      </button>
    </div>
  );
}

export default Login;
