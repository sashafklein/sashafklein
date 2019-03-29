import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ResumeItem from './ResumeItem';

const EducationAndWork = ({ work, education }) => (
  <div className="education-and-work-container">
    <h1 className="section-header">Work Experience</h1>
    <div className="inset experience">
      {
        work.map(job => (
          <ResumeItem key={ job.title.split(' ').join('-') } item={ job } />
        ))
      }
    </div>

    <br />

    <h1 className="section-header">Education</h1>
    <div className="inset education">
      {
        education.map(school => (
          <ResumeItem key={ school.title.split(' ').join('-') } item={ school } />
        ))
      }
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
