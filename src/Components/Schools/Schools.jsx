import React, { useEffect, useState } from "react";
import "./Schools.css";
import { getAll, getOrderByJobId } from "../../APIServices";
import logo from "../../../public/logo.png";

const Schools = ({ selectedSchool, setSelectedSchool }) => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    getAll()
      .then((response) => setSchools(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSchoolClick = async (jobId) => {
    console.log("handleSchoolClick", selectedSchool);
    getOrderByJobId(jobId)
      .then((response) => setSelectedSchool(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <main className="School">
      <header className="Header">
        <img src={logo} className="Logo" alt="Logo" />
      </header>
      <div className="Body">
        <header className="Headline">Select your school</header>
        <div className="Content">
          {schools
            .map((school) => (
              <div
                className="Card"
                key={school._id}
                onClick={() => {
                  handleSchoolClick(school._id);
                }}
              >
                <img
                  className="Image"
                  src={school.display_logo_url}
                  alt="Job_Image"
                />
                <div className="Title">{school.display_school_name}</div>
              </div>
            ))
            .sort()}
        </div>
      </div>
    </main>
  );
};

export default Schools;
