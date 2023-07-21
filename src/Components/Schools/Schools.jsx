import React, { useEffect, useState } from "react";
import "./Schools.css";
import { getAll, getOrderByJobId } from "../APIServices";

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
        <header className="Heading">Select your school</header>
        <div className="School_Content">
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
                <div className="Label">{school.display_school_name}</div>
              </div>
            ))
            .sort()}
      </div>
    </main>
  );
};

export default Schools;
