import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () =>{
    const{isAuthenticated, setIsAuthenticated} = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("Admin");

    const navigateTo = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://jkl-hospital.onrender.com/api/v1/user/login",
                { email, password, role: userRole },
                 {
                    withCredentials: true,
                     headers: {"Content-Type": "application/json" },
                    }
                );
                console.log("Login Response:", response);
                toast.success(response.data.message);
                setIsAuthenticated(true);
                navigateTo("/");

        } catch (error) {
            console.error("Login Error:", error);
            if (error.reponse && error.reponse.data) {
            toast.error(error.reponse.data.message);
        } else {
            toast.error("Please Provide All Details");
        }
    }
    };

    if(isAuthenticated){
        return <Navigate to={"/"}/>;
    }



    return (
        <div className="container form-component login-form">
          <h2>Sign In</h2>
          <p>Please Login To Continue</p>
          <p>
            Welcome To JKL Hospital 
          </p>
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              
            </div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit">Login</button>
            </div>
            
          </form>
        </div>
      );
    };
    
    export default Login;