import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Create from "./Components/Create";
import Read from "./Components/Read";
import Update from "./Components/Update";
import Profiles from "./Components/Profiles";


const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);
  };

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<div>
              <Create onFormSubmit={handleFormSubmit} />
              <Read />
            </div>} />
        <Route path="/read" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </Router>
    </>
    
    
  );
};

export default App;
