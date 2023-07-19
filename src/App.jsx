import React, { useState } from "react";
import Header from "./Header";
import Schools from "./Schools";
import StudentPage from "./Students";
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
        <StudentPage selectedSchool={selectedSchool} />
      )}
    </main>
  );
};

export default App;
