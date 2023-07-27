import React, { useState } from "react";
import Header from "./Components/Header/Header.jsx";
import Schools from "./Components/Schools/Schools";
import StudentPage from "./Components/Students/Students";
import "./App.css";
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';


const App = () => {
  const [selectedSchool, setSelectedSchool] = useState([]);

  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/">
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
        </Route>
      </Switch>
    </div>
  </Router>
  );
};

export default App;