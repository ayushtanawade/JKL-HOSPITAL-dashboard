import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const PatientCaregivers = () => {
  const [patients, setPatients] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);

  useEffect(() => {
    axios
      .get("https://jkl-hospital.onrender.com/api/v1/user/patients")
      .then((response) => {
        setPatients(response.data.patients);
        console.log(response.data.patients);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("https://jkl-hospital.onrender.com/api/v1/user/caregivers")
      .then((response) => {
        setCaregivers(response.data.caregivers);
        //console.log(response.data.caregivers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAssignCaregiver = async () => {
    if (!selectedPatient || !selectedCaregiver) {
      alert("Please select both a patient and a caregiver.");
      return;
    }

    // Debug: Log selectedPatient and selectedCaregiver
    console.log("Selected Patient:", selectedPatient);
    console.log("Selected Caregiver:", selectedCaregiver);

    try {
      const payload = {
        patientId: selectedPatient._id,
        caregiverId: selectedCaregiver._id,
      };

      // Debug: Log the payload
      console.log("Payload:", payload);

      const response = await axios.post(
        "https://jkl-hospital.onrender.com/api/v1/user/assign-caregiver",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Debug: Log backend response
      console.log("Response from backend:", response.data);

      // Update state based on response
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === response.data.patient._id
            ? response.data.patient
            : patient
        )
      );

      alert(response.data.message);
    } catch (error)
     { console.error("Backend Error Response:", error.response?.data || error);
      // Debug: Log error details
      console.error("Error during assign caregiver:", error.response || error);
      alert("Error assigning caregiver");
    }
  };

  const handleRemoveCaregiver = async () => {
    axios
      .post("https://jkl-hospital.onrender.com/api/v1/user/remove-caregiver", {
        patientId: selectedPatient._id,
        caregiverId: selectedCaregiver._id,
      })
      .then((response) => {
        console.log(response.data);
        setPatients(response.data.patient);
        setCaregivers(response.data.caregiver);
        alert(response.data.message);
        // Optionally refresh the list of caregivers for the selected patient
      })
      .catch((error) => {
        console.error(error);
        alert("Error removing caregiver");
      });
  };

  return (
    <div className="patient-caregivers page container">
      <h2 className="patient-caregivers-heading">Patient Caregivers</h2>
      <select
        className="patient-caregivers-select"
        onChange={(e) => setSelectedPatient(patients[e.target.value])}
      >
        <option value="">Select Patient</option>
        {patients.map((patient, index) => (
          <option key={patient._id} value={index}>
            {patient.firstName} {patient.lastName}
          </option>
        ))}
      </select>

      <select
        className="patient-caregivers-select"
        onChange={(e) => setSelectedCaregiver(caregivers[e.target.value])}
      >
        <option value="">Select Caregiver</option>
        {caregivers.map((caregiver, index) => (
          <option key={caregiver._id} value={index}>
            {caregiver.firstName} {caregiver.lastName}
          </option>
        ))}
      </select>

      <button
        className="patient-caregivers-button"
        onClick={handleAssignCaregiver}
      >
        Assign Caregiver
      </button>
      <button
        className="patient-caregivers-button"
        onClick={handleRemoveCaregiver}
      >
        Remove Caregiver
      </button>

      <ul className="patient-caregivers-list">
  {selectedPatient &&
    selectedPatient.caregivers.map((caregiverId) => {
      // Find the caregiver details from the caregivers list
      const caregiverDetails = caregivers.find(
        (caregiver) => caregiver._id === caregiverId
      );

      // Render the caregiver's details if found
      return caregiverDetails ? (
        <li key={caregiverDetails._id} className="patient-caregivers-list-item">
          <span className="patient-caregivers-list-item-name">
            {caregiverDetails.firstName} {caregiverDetails.lastName}
          </span>
        </li>
      ) : (
        <li key={caregiverId} className="patient-caregivers-list-item">
          <span className="patient-caregivers-list-item-name">
            Caregiver details not found
          </span>
        </li>
      );
    })}
</ul>
    </div>
  );
};

export default PatientCaregivers;