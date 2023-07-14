import React, { useEffect, useState } from "react";
import logo from "../public/logo.png";
// import axios from 'axios';
import "./App.css";

import axios from "axios";

const BaseURL = "https://zingcam.prod.flamapp.com/skrull";
const AuthKey = "02500eb9-eda8-45c2-ba1c-bfb3cef5a02d";

const getAll = async () => {
  try {
    const response = await axios.get(`${BaseURL}/jobs/getAll`, {
      headers: {
        Authorization: AuthKey,
      },
    });

    console.log("getAll", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getOrderByJobId = async (jobId) => {
  try {
    const response = await axios.get(
      `${BaseURL}/orders/getOrderByJobId/${jobId}`,
      {
        headers: {
          Authorization: AuthKey,
        },
      }
    );
    console.log("getOrderByJobId", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const App = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);
  // const [students, setStudents] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    getAll()
      .then((response) => setSchools(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSchoolClick = async (jobId) => {
    console.log("handleSchoolClick");
    getOrderByJobId(jobId)
      .then((response) => setSelectedSchool(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <main className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="Logo" />
      </div>
      <div className="App-body">
        <div className="App-body-title"> Select your school</div>
        <div className="App-body-card">
          {schools.map((school) => (
            <div
              className="App-body-card-item"
              key={school._id}
              onClick={() => handleSchoolClick(school._id)}
            >
              <img
                className="App-body-card-item-img"
                src={school.display_logo_url}
                alt="Job Logo"
              />
              <div className="App-body-card-item-title">
                <span>{school.display_school_name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSchool && (
        <div>
          <h2>Students in {selectedSchool.name}</h2>
          <div className="App-body-card">
            {selectedSchool.map((student) => (
              <div
                className="App-body-card-item"
                key={student._id}
                // onClick={() => handleSchoolClick(student._id)}
              >
                <div className="App-body-card-item-title">
                  <span>{student.receiver_details.name}</span>
                  <img
                    className="App-body-card-item-img"
                    src={student.images[0]}
                    alt="Job Logo"
                  />
                  <img
                    className="App-body-card-item-thumbnail_url"
                    src={student.thumbnail_url}
                    alt="Job Logo"
                  />
                  <video
                    className="App-body-card-item-video_url"
                    controls
                    src={student.video_url}
                    type="video/mp4"
                  />
                  <video
                    className="App-body-card-item-watermark_video_url"
                    controls
                    src={student.watermark_video_url}
                    type="video/mp4"
                  />
                  <img
                    className="App-body-card-item-gif_url"
                    controls
                    src={student.gif_url}
                    alt="Job Logo"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
