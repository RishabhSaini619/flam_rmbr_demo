import React from "react";
import "./Page.css";

const Page = ({ selectedSchool }) => {
  return (
    <main className="Page">
      {selectedSchool && (
        <div className="Page-body">
          <div className="Page-body-header">
            <div className="Page-body-header-title">Students List</div>
            <button className="Page-body-header-button">Download</button>
          </div>
          <div className="Page-body-card">
            {selectedSchool.map((student) => (
              <div className="Page-body-card-item" key={student._id}>
                <div className="Page-body-card-item-header">
                  <div className="Page-body-card-item-header-title">
                    {student.receiver_details.name}
                  </div>
                  <button className="Page-body-card-item-header-button">
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
                        id={student._id + "image"}
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
                        id={student._id + "thumbnail"}
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
                        id={student._id + "video"}
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
                        id={student._id + "watermark"}
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
                        id={student._id + "gif"}
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
