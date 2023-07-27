import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import "./Students.css";
import cloudAdd from "../../../public/AddCSV.png";
import cloudDownload from "../../../public/ExportCSV.png";
import pageNext from "../../../public/pageNext.png";
import pagePrevious from "../../../public/pagePrevious.png";

const StudentPage = ({ selectedSchool }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState({});
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [showStudent, setShowStudent] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 10;
  const totalPages = Math.ceil(selectedSchool.length / limit);

  const [userPageInput, setUserPageInput] = useState(""); // State variable to track the user input for page value

  const handleSetPage = (event) => {
    const newPage = parseInt(userPageInput, 10);
    if (!isNaN(newPage) && newPage >= 0) {
      setPage(newPage);
    }
  };
  const handleUserPageInput = (event) => {
    setUserPageInput(event.target.value);
    handleSetPage();
  };

  const pageDown = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const pageUp = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
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

      console.log("CSV Entry:", csvEntry);
    }
  };

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
      {showStudent &&
        showStudent.length &&
        showStudent.map((student) => (
          <div className="Student_Card" key={student._id}>
            <div className="Student_Card_Header">
              <div className="Heading">{student.receiver_details.name}</div>
              <img
                className="AddCSV"
                src={cloudAdd}
                onClick={() => handleAddToCsvClick(student._id)}
                alt="cloudAdd"
              />
            </div>
            <div className="Student_Card_Content">
              <div className="Student_Card_Content_Item">
                <img
                  className="Student_Card_Content_Item_Image"
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
                  <div className="Label">Images</div>
                </div>
              </div>
              <div className="Student_Card_Content_Item">
                <img
                  className="Student_Card_Content_Item_Image"
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
                  <div className="Label">Thumbnail</div>
                </div>
              </div>
              <div className="Student_Card_Content_Item">
                <video
                  className="Student_Card_Content_Item_Image"
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
                  <div className="Label">Video</div>
                </div>
              </div>
              <div className="Student_Card_Content_Item">
                <video
                  className="Student_Card_Content_Item_Image"
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
                  <div className="Label">Watermark</div>
                </div>
              </div>
              <div className="Student_Card_Content_Item">
                <img
                  className="Student_Card_Content_Item_Image"
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
                  <div className="Label">GIF</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <footer className="Footer">
        <div className="Title">{selectedSchool[0].job_name}</div>

        <div className="Page">
          <img
            className="PageButton"
            src={pagePrevious}
            onClick={pageDown}
            alt="pageDown"
          />
          <div className="Label">
            Page : {page + 1} /{totalPages}
          </div>
          <img
            className="PageButton"
            src={pageNext}
            onClick={pageUp}
            alt="pageUp"
          />
        </div>
        <CSVLink
          className="Download"
          data={generateCsvData()}
          filename={selectedSchool[0].job_name}
          type=".csv"
        >
          <img src={cloudDownload} alt="DownloadCSV" className="DownloadCSV" />
        </CSVLink>
      </footer>
    </main>
  );
};

export default StudentPage;
