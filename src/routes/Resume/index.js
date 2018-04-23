import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

import CoreLayout from 'containers/CoreLayout';
import SkillsOverlay from './SkillsOverlay';
import EducationAndWork from './EducationAndWork';
import Image from 'components/Image';

import 'styles/core.scss';

export const professionalTitle = "Senior Full Stack Engineer / Tech Lead";
const descriptionText = [
  'Full-stack developer',
  ' and ',
  'entrepreneur',
  ', comfortable with a ',
  'wide range of technologies',
  ' and experienced ',
  'leading teams',
  ' and ',
  'running client projects',
  '.'
];

const description = <p>{ descriptionText.map((t, i) => i % 2 === 0 ? <strong key={i}>{t}</strong> : t) }</p>;

export const Resume = ({ skills }) => (
  <CoreLayout className="resume">
    <div className="resume-container undecorated">
      <div className="header-area">
        <div className="container med-and-up header-container">
          <div className="headshot-box">
            <Image src="https://dl.dropboxusercontent.com/s/kbi6shbk5a5r54x/headshot2.jpg?dl=0" className="headshot" />
          </div>
          <div className="header-text-section">
            <div className="name-and-icons">
              <h1 className="name">Sasha Klein</h1>
              <div className="link-icons">
                <a href="https://git.io/sasha">
                  <i className="fa fa-github" />
                </a>
                <a href="https://www.linkedin.com/pub/sasha-klein/34/595/1b5">
                  <i className="fa fa-linkedin-square" />
                </a>
                <a href="http://stackoverflow.com/users/1408935/sasha">
                  <i className="fa fa-stack-overflow" />
                </a>
              </div>
            </div>
            <h2 className="self-description">{ professionalTitle }</h2>
            { description }
          </div>
        </div>
      </div>
      <div className="main-resume-body container blue-links">
        <EducationAndWork />
      </div>
      <SkillsOverlay />
    </div>
  </CoreLayout>
);

const mapStateToProps = state => ({
  skills: state.data.skills
});

export default connect(mapStateToProps)(Resume);
