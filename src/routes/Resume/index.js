import React from 'react';
import Markdown from 'react-markdown';

import Headshot from 'assets/img/headshot.jpg';
import Image from 'components/Image';
import AnimatedLoader from 'components/AnimatedLoader';
import BP from 'components/BP';

import EducationAndWork from './EducationAndWork';

import 'styles/core.scss';

export const professionalTitle = 'Senior Full Stack Engineer & Manager';
const descriptionMd = 'Full-stack **engineer**, and engineering **manager**, comfortable with a **wide range of technologies** and experienced **leading teams** and running client projects.';

const description = <Markdown source={ descriptionMd } />;

export const Resume = () => (
  <div className="resume-container undecorated">
    <AnimatedLoader className="header-area fade-and-slide-up">
      <div className="container header-container">
        <BP type="above" name="mobileMd">
          <div className="headshot-box">
            <AnimatedLoader className="fade-and-slide-up" waitMs={ 400 }>
              <Image src={ Headshot } className="headshot" />
            </AnimatedLoader>
          </div>
        </BP>
        <div className="header-text-section">
          <div className="name-and-icons">
            <h1 className="name">Sasha Klein</h1>
            <div className="link-icons">
              <a target="_blank" href="https://git.io/sasha">
                <i className="fa fa-github" />
              </a>
              <a target="_blank" href="https://www.linkedin.com/pub/sasha-klein/34/595/1b5">
                <i className="fa fa-linkedin-square" />
              </a>
              <a target="_blank" href="http://stackoverflow.com/users/1408935/sasha">
                <i className="fa fa-stack-overflow" />
              </a>
            </div>
          </div>
          <AnimatedLoader className="fade-and-slide-up" waitMs={ 200 }>
            <h2 className="self-description">{ professionalTitle }</h2>
          </AnimatedLoader>
          <BP type="above" name="mobileLg">
            <AnimatedLoader className="fade-and-slide-up" waitMs={ 400 }>
              { description }
            </AnimatedLoader>
          </BP>
        </div>
      </div>
      <BP type="below" name="tabletSm">
        <AnimatedLoader className="container fade-and-slide-up" waitMs={ 400 }>
          { description }
        </AnimatedLoader>
      </BP>
    </AnimatedLoader>
    <div className="main-resume-body container blue-links">
      <AnimatedLoader className="fade-and-slide-up" waitMs={ 400 }>
        <EducationAndWork />
      </AnimatedLoader>
    </div>
  </div>
);

export default Resume;
