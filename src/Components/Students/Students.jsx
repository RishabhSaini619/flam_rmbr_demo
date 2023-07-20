import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import "./Students.css";
// import downloadPng from "../../../public/download.png";
import logo from "../../../public/logo.png";

const StudentPage = ({ selectedSchool }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState({});
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [showStudent, setShowStudent] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 10;

  const pageDown = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const pageUp = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    let student = [];

    const size =
      limit * page + limit > selectedSchool.length
        ? selectedSchool.length
        : limit * page + limit;
    console.log(page * limit, " ", limit * page + limit, "->", size);
    if (selectedSchool.length) {
      for (let i = page * limit; i < size; i++) {
        student.push(selectedSchool[i]);
      }

      setShowStudent(student);
    }
  }, [selectedSchool, page]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (event, studentId) => {
    const checkboxId = event.target.id;
    const checkboxValue = event.target.checked;

    console.log(
      "Checkbox Change: studentId=",
      studentId,
      " checkboxId=",
      checkboxId,
      " value=",
      checkboxValue
    );

    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [studentId]: {
        ...(prevState[studentId] || {}),
        [checkboxId]: checkboxValue,
      },
    }));
  };

  // Function to handle "Add 2 CSV" button click
  const handleAddToCsvClick = (studentId) => {
    setSelectedStudent(
      selectedSchool.find((student) => student._id === studentId)
    );
    console.log("Add to CSV Click: studentId=", studentId);
    console.log("Add to CSV Click: studentId=", selectedStudent);

    if (selectedStudent) {
      const csvEntry = {
        schoolId: selectedStudent.job_id,
        schoolName: selectedStudent.job_name,
        orderId: selectedStudent._id,
        studentName: selectedStudent.receiver_details.name,
        imageURL: selectedStudent.images,
        thumbnailURL: selectedStudent.thumbnail_url,
        videoURL: selectedStudent.video_url,
        watermarkURL: selectedStudent.watermark_video_url,
        gifURL: selectedStudent.gif_url,
        image: selectedCheckboxes[studentId].image ? "Invalid" : "",
        thumbnail: selectedCheckboxes[studentId].thumbnail ? "Invalid" : "",
        video: selectedCheckboxes[studentId].video ? "Invalid" : "",
        watermark: selectedCheckboxes[studentId].watermark ? "Invalid" : "",
        gif: selectedCheckboxes[studentId].gif ? "Invalid" : "",
      };

      console.log("CSV Entry:", csvEntry); // Do something with the CSV entry (e.g., add it to a CSV file)
    }
  };

  // Generate CSV data from selected checkboxes
  const generateCsvData = () => {
    const csvData = [];
    selectedSchool.forEach((student) => {
      const studentId = student._id;

      if (selectedCheckboxes[studentId]) {
        const studentCheckboxes = selectedCheckboxes[studentId];
        const csvEntry = {
          schoolId: student.job_id,
          schoolName: student.job_name,
          orderId: student._id,
          studentName: student.receiver_details.name,
          imageURL: student.images,
          thumbnailURL: student.thumbnail_url,
          videoURL: student.video_url,
          watermarkURL: student.watermark_video_url,
          gifURL: student.gif_url,
          image: studentCheckboxes.image ? "Invalid" : "",
          thumbnail: studentCheckboxes.thumbnail ? "Invalid" : "",
          video: studentCheckboxes.video ? "Invalid" : "",
          watermark: studentCheckboxes.watermark ? "Invalid" : "",
          gif: studentCheckboxes.gif ? "Invalid" : "",
        };

        csvData.push(csvEntry);
      }
    });

    return csvData;
  };

  return (
    <main className="Students">
      <header className="Header">
        <img src={logo} className="Header-logo" alt="Logo" />
        <div className="Page-body-header-title">
          {selectedSchool[0].job_name}
        </div>
        <button className="Page-body-header-button">
          <CSVLink
            data={generateCsvData()}
            filename="students.csv"
            className="Page-body-header-link"
          >
            Download
          </CSVLink>
        </button>
      </header>
      <div className="Body">
        {selectedSchool && (
          <div className="Page-body">
            <div className="Page-body-card">
              {showStudent &&
                showStudent.length &&
                showStudent.map((student) => (
                  <div className="Page-body-card-item" key={student._id}>
                    <div className="Page-body-card-item-header">
                      <div className="Page-body-card-item-header-title">
                        {student.receiver_details.name}
                      </div>
                      <button
                        className="Page-body-card-item-header-button"
                        onClick={() => handleAddToCsvClick(student._id)}
                      >
                        Add 2 CSV
                      </button>
                    </div>
                    <div className="Page-body-card-item-component">
                      <div className="Page-body-card-item-component-item">
                        <img
                          className="Page-body-card-item-component-item-component"
                          src={student.images[0]}
                          alt="Job Logo"
                        />
                        <div className="check">
                          <input
                            className="checkbox"
                            type="checkbox"
                            id={`image`}
                            onChange={(event) =>
                              handleCheckboxChange(event, student._id)
                            }
                          />
                          <div className="Page-body-card-item-title">
                            Images
                          </div>
                        </div>
                      </div>

                      <div className="Page-body-card-item-component-item">
                        <img
                          className="Page-body-card-item-component-item-component"
                          src={student.thumbnail_url}
                          alt="Job Logo"
                        />
                        <div className="check">
                          <input
                            className="checkbox"
                            type="checkbox"
                            id={`thumbnail`}
                            onChange={(event) =>
                              handleCheckboxChange(event, student._id)
                            }
                          />
                          <div className="Page-body-card-item-title">
                            Thumbnail
                          </div>
                        </div>
                      </div>
                      <div className="Page-body-card-item-component-item">
                        <video
                          className="Page-body-card-item-component-item-component"
                          controls
                          src={student.video_url}
                          type="video/mp4"
                        />
                        <div className="check">
                          <input
                            className="checkbox"
                            type="checkbox"
                            id={`video`}
                            onChange={(event) =>
                              handleCheckboxChange(event, student._id)
                            }
                          />
                          <div className="Page-body-card-item-title">Video</div>
                        </div>
                      </div>
                      <div className="Page-body-card-item-component-item">
                        <video
                          className="Page-body-card-item-component-item-component"
                          controls
                          src={student.watermark_video_url}
                          type="video/mp4"
                        />
                        <div className="check">
                          <input
                            className="checkbox"
                            type="checkbox"
                            id={`watermark`}
                            onChange={(event) =>
                              handleCheckboxChange(event, student._id)
                            }
                          />
                          <div className="Page-body-card-item-title">
                            Watermark
                          </div>
                        </div>
                      </div>
                      <div className="Page-body-card-item-component-item">
                        <img
                          className="Page-body-card-item-component-item-component"
                          controls
                          src={student.gif_url}
                          alt="Job Logo"
                        />
                        <div className="check">
                          <input
                            className="checkbox"
                            type="checkbox"
                            id={`gif`}
                            onChange={(event) =>
                              handleCheckboxChange(event, student._id)
                            }
                          />
                          <div className="Page-body-card-item-title">GIF</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <footer className="Footer">
        <button
          onClick={pageDown}
          disabled={page === 0}
          className="Page-body-header-button"
        >
          Previous
        </button>
        <div>
          Current Page : {page + 1} / {Math.ceil(selectedSchool.length / limit)}
        </div>
        <button
          onClick={pageUp}
          disabled={limit * page + limit > selectedSchool.length}
          className="Page-body-header-button"
        >
          Next
        </button>
      </footer>
    </main>
  );
};

export default StudentPage;
