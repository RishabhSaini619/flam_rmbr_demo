import React, { useState } from "react";
import Page from "./Students";
import Header from "./Header";
import SchoolPage from "./SchoolPage";

const App = () => {
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [isStudent, setIsStudent] = useState(false);

  return (
    <main className="App">
      <Header />
      {!selectedSchool.length ? (
        <SchoolPage
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
        />
      ) : (
        <Page selectedSchool={selectedSchool} />
      )}
    </main>
  );
};

export default App;
