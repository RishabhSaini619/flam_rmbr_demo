import React, { useEffect, useState } from "react";
import "./Schools.css";
import { getAll, getOrderByJobId } from "../APIServices";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Schools = ({ selectedSchool, setSelectedSchool }) => {
  const [schools, setSchools] = useState([]);

  const query = useQuery();

  useEffect(() => {
    console.log("useEffect");
    getAll()
      .then((response) => setSchools(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSchoolClick = async (jobId) => {
    console.log("handleSchoolClick", selectedSchool);
    getOrderByJobId(jobId)
      .then((response) => 
        (query.get('id')) ? setSelectedSchool(response.data.filter((item) => item.receiver_details.name.includes(query.get('id')))) : setSelectedSchool(response.data)
      )
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleSchoolClick(query.get('schooldId'));
  }, [query.get('schooldId')]);

  return (
    <main className="School">
      <div className="schoolHeader">
        <div className="Heading">
          Select your school</div>
          <div className="search">
            <div className="searchcontent">
              <div className="searchBar">search bar</div>
              <div className="searchBtn">search</div>
            </div>
            <div className="searchStudent">
            <div className="searchBar">search bar</div>
              <div className="searchBtn">search</div>
            </div>
          </div>
          </div>
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
