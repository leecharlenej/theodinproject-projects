import { useState } from "react";
import "./App.css";
import FormDetails from "./components/FormDetails.jsx";
import CVApplication from "./components/CVApplication.jsx";

function App() {
  const [formDetails, setFormDetails] = useState({
    firstname: "Charlene",
    lastname: "Lee",
    job: "Masters Student",
    email: "charlene@odinproject.com",
    phoneNo: "1234-5678",
    address: "123 Odin Lane",
    bio: "Tech enthusiast",
    work: [],
    education: [],
    skills: [],
  });

  // Function to handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  }

  return (
    <div className="app">
      <div className="menu">
        {/* Pass formDetails and handleChange to FormDetails */}
        <FormDetails formDetails={formDetails} handleChange={handleChange} />
      </div>

      <div className="main">
        <div id="cv-application">
          {/* Pass formDetails to CVApplication */}
          <CVApplication formDetails={formDetails} />
        </div>
      </div>
    </div>
  );
}

export default App;
