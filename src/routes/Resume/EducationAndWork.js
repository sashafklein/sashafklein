import React from 'react';
import { connect } from 'react-redux';

import ResumeItem from './ResumeItem';

const EducationAndWork = ({ work, education }) => (
  <div className="education-and-work-container">
    <h1 className="section-header">Work Experience</h1>
    <div className="inset experience">
      {
        work.map((job, index) => (
          <ResumeItem key={ index } item={ job } />
        ))
      }
    </div>

    <br />

    <h1 className="section-header">Education</h1>
    <div className="inset education">
      {
        education.map((school, index) => (
          <ResumeItem key={ index } item={ school } />
        ))
      }
    </div>
  </div>
);

const { array } = React.PropTypes;
EducationAndWork.propTypes = {
  work: array,
  education: array
};
const mapStateToProps = state => ({
  work: state.data.work,
  education: state.data.education
});

export default connect(mapStateToProps)(EducationAndWork);
