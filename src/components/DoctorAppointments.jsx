// frontend/src/components/DoctorAppointments.jsx
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, user } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://jkl-hospital.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="doctor-appointments">
      <h1>My Appointments</h1>
      <div className="appointments-container">
        {appointments && appointments.length > 0 ? (
          appointments
            .filter((appointment) => appointment.doctorId === user._id)
            .map((appointment) => (
              <div className="appointment" key={appointment._id}>
                <h2>
                  {appointment.firstName} {appointment.lastName}
                </h2>
                <p>
                  Date: <span>{appointment.appointment_date}</span>
                </p>
                <p>
                  Department: <span>{appointment.department}</span>
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={
                      appointment.status === "Pending"
                        ? "pending"
                        : appointment.status === "Accepted"
                        ? "accepted"
                        : "rejected"
                    }
                  >
                    {appointment.status}
                  </span>
                </p>
              </div>
            ))
        ) : (
          <h2>No Appointments Found!</h2>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;