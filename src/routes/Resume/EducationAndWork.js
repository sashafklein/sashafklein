import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AnimatedLoader from "components/AnimatedLoader";

import ResumeItem from "./ResumeItem";

const EducationAndWork = ({ work, education }) => (
  <div className="education-and-work-container">
    <h1 className="section-header">Work Experience</h1>
    <div className="inset experience">
      {work.map((job, index) => (
        <AnimatedLoader
          key={job.title.split(" ").join("-")}
          className="fade-and-slide-up"
          waitMs={400 + index * 100}
        >
          <ResumeItem item={job} />
        </AnimatedLoader>
      ))}
    </div>

    <br />

    <h1 className="section-header">Education</h1>
    <div className="inset education">
      {education.map((school, index) => (
        <AnimatedLoader
          key={school.title.split(" ").join("-")}
          className="fade-and-slide-up"
          waitMs={index * 100}
        >
          <ResumeItem item={school} />
        </AnimatedLoader>
      ))}
    </div>
  </div>
);

const { array } = PropTypes;
EducationAndWork.propTypes = {
  work: array,
  education: array
};
const mapStateToProps = state => ({
  work: state.data.work,
  education: state.data.education
});

export default connect(mapStateToProps)(EducationAndWork);
