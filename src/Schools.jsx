import React, { useEffect, useState } from 'react'
import "./Schools.css";
import { getAll, getOrderByJobId } from './APIServices';



const Schools = ({selectedSchool, setSelectedSchool}) => {
    const [schools, setSchools] = useState([]);
    
  useEffect(() => {
    console.log("useEffect");
    getAll()
      .then((response) => setSchools(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSchoolClick = async (jobId) => {
    console.log("handleSchoolClick",selectedSchool);
    getOrderByJobId(jobId)
      .then((response) => setSelectedSchool(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <main className="School">
        <div className="App-body-title">Select your school</div>
        <div className="App-body-card">
          {schools.map((school) => (
            <div
              className="App-body-card-item"
              key={school._id}
              onClick={() => {
                handleSchoolClick(school._id)
            }}
            >
              <img
                className="App-body-card-item-img"
                src={school.display_logo_url}
                alt="Job Logo"
              />
              <div className="App-body-card-item-title">
                {school.display_school_name}
              </div>
            </div>
          )).sort()}
        </div>
      </main>
  )
}

export default Schools
