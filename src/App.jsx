import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Doctors from "./components/Doctors";
import Messages from "./components/Messages";
import PatientCaregivers from "./components/PatientCaregivers"; // New import
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import axios from 'axios';
import DoctorAppointments from './components/DoctorAppointments';



const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser  } = useContext(Context);

  useEffect(() => {
    const fetchUser  = async () => {
      try {
        const response = await axios.get(
          "https://jkl-hospital.onrender.com/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser (response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser ({});
      }
    };
    fetchUser ();
  }, [isAuthenticated, setUser ]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
          {isAuthenticated && (
          <Route path="/patient-caregivers" element={<PatientCaregivers />} /> // New route
        )}
        <Route path="/user/assign-caregiver" element={<PatientCaregivers />} />
        <Route path='/doctor-appointments' element={<DoctorAppointments />} />
        
        </Routes>
        <ToastContainer position='top-center' />
      </Router>
    </>
  );
};

export default App;