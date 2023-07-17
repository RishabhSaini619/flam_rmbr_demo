import React from "react";
import "./Page.css";

const Page = ({ selectedSchool }) => {
  return (
    <main className="Page">
      {selectedSchool && (
        <div className="Page-body">
          <h2>Students in {selectedSchool.name}</h2>
          <div className="Page-body-card">
            {selectedSchool.map((student) => (
              <div className="Page-body-card-item" key={student._id}>
                <div className="Page-body-card-item-title">
                  {student.receiver_details.name}
                </div>
                <div className="Page-body-card-item-component">
                  <div className="Page-body-card-item-component-item">
                    <img
                      className="Page-body-card-item-component-item-component"
                      src={student.images[0]}
                      alt="Job Logo"
                    />
                    <span>images_url</span>
                  </div>
                  <div className="Page-body-card-item-component-item">
                    <img
                      className="Page-body-card-item-component-item-component"
                      src={student.thumbnail_url}
                      alt="Job Logo"
                    />
                    <span>thumbnail_url</span>
                  </div>
                  <div className="Page-body-card-item-component-item">
                    <video
                      className="Page-body-card-item-component-item-component"
                      controls
                      src={student.video_url}
                      type="video/mp4"
                    />
                    <span>video_url</span>
                  </div>
                  <div className="Page-body-card-item-component-item">
                    <video
                      className="Page-body-card-item-component-item-component"
                      controls
                      src={student.watermark_video_url}
                      type="video/mp4"
                    />
                    <span>watermark_video_url</span>
                  </div>
                  <div className="Page-body-card-item-component-item">
                    <img
                      className="Page-body-card-item-component-item-component"
                      controls
                      src={student.gif_url}
                      alt="Job Logo"
                    />
                    <span>"gif_url"</span>
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
