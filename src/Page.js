import React from "react";
import { CSVLink } from "react-csv";
import "./Page.css";

const Page = ({ selectedSchool }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState({});

  // Function to handle checkbox changes
  const handleCheckboxChange = (event, studentId) => {
    const checkboxId = event.target.id;
    const checkboxValue = event.target.checked;

    console.log("Checkbox Change: studentId=", studentId, " checkboxId=", checkboxId, " value=", checkboxValue);

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
    console.log("Add to CSV Click: studentId=", studentId);

    const selectedStudent = selectedSchool.find((student) => student._id === studentId);

    if (selectedStudent) {
      const csvEntry = {
        schoolId: selectedStudent.job_id,
        schoolName: selectedStudent.job_name,
        studentId: selectedStudent._id,
        studentName: selectedStudent.receiver_details.name,
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
          studentId: student._id,
          studentName: student.receiver_details.name,
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
    <main className="Page">
      {selectedSchool && (
        <div className="Page-body">
          <div className="Page-body-header">
            <div className="Page-body-header-title">Students List</div>
            <button className="Page-body-header-button">
              <CSVLink
                data={generateCsvData()}
                filename="students.csv"
                className="Page-body-header-link"
              >
                Download
              </CSVLink>
            </button>
          </div>
          <div className="Page-body-card">
            {selectedSchool.map((student) => (
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
                        onChange={(event) => handleCheckboxChange(event, student._id)}
                      />
                      <div className="Page-body-card-item-title">Images</div>
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
                        onChange={(event) => handleCheckboxChange(event, student._id)}
                      />
                      <div className="Page-body-card-item-title">Thumbnail</div>
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
                        onChange={(event) => handleCheckboxChange(event, student._id)}
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
                        onChange={(event) => handleCheckboxChange(event, student._id)}
                      />
                      <div className="Page-body-card-item-title">
                        Watermark Video
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
                        onChange={(event) => handleCheckboxChange(event, student._id)}
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
    </main>
  );
};

export default Page;
