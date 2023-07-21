import React, { useState } from "react";
import Header from "./Components/Header/Header.jsx";
import Schools from "./Components/Schools/Schools";
import StudentPage from "./Components/Students/Students";
import "./App.css";

const App = () => {
  const [selectedSchool, setSelectedSchool] = useState([]);

  return (
    <main className="App">
      <Header />
      {!selectedSchool.length ? (
        <Schools
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
        />
      ) : (
        <StudentPage 
          selectedSchool={selectedSchool}
        />
      )}
    </main>
  );
};

export default App;