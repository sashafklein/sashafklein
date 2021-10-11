import React from "react";
import Markdown from "react-markdown";

import Image from "components/Image";
import AnimatedLoader from "components/AnimatedLoader";
import BP from "components/BP";
import Headshot from "../../assets/img/headshot.jpg";

import EducationAndWork from "./EducationAndWork";

import "styles/core.scss";

export const professionalTitle = "Director of Engineering";
const descriptionMd = `I build teams and technical systems to solve problems across technologies and industries.

I’m looking to apply my cross-disciplinary engineering, team leadership, and product experience to help Bitcoin take over the world.`;

const description = <Markdown source={descriptionMd} />;

export const Resume = () => (
  <div className="resume-container undecorated">
    <AnimatedLoader className="header-area fade-and-slide-up">
      <div className="container header-container">
        <div className="headshot-box">
          <AnimatedLoader className="fade-and-slide-up" waitMs={400}>
            <Image src={Headshot} className="headshot" />
          </AnimatedLoader>
        </div>
        <div className="header-text-section">
          <div className="name-and-icons">
            <h1 className="name">Sasha Klein</h1>
            <div className="link-icons">
              <a
                title="Github"
                target="blank"
                rel="noopener noreferrer"
                href="https://git.io/sasha"
              >
                <i className="fa fa-github" />
              </a>
              <a
                title="LinkedIn"
                target="blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/pub/sasha-klein/34/595/1b5"
              >
                <i className="fa fa-linkedin-square" />
              </a>
              <a
                title="Stack Overflow"
                target="blank"
                rel="noopener noreferrer"
                href="http://stackoverflow.com/users/1408935/sasha"
              >
                <i className="fa fa-stack-overflow" />
              </a>
              <a
                title="Resume"
                target="blank"
                rel="noopener noreferrer"
                href="https://www.dropbox.com/s/unjd6m7z87ix1cg/Sasha%20Klein%20Resume.pdf?dl=0"
              >
                <i className="fa fa-file-text" />
              </a>
            </div>
          </div>
          <AnimatedLoader className="fade-and-slide-up" waitMs={200}>
            <h2 className="self-description">{professionalTitle}</h2>
          </AnimatedLoader>
          <BP type="above" name="mobileLg">
            <AnimatedLoader className="fade-and-slide-up" waitMs={400}>
              {description}
            </AnimatedLoader>
          </BP>
        </div>
      </div>
      <BP type="below" name="tabletSm">
        <AnimatedLoader className="container fade-and-slide-up" waitMs={400}>
          {description}
        </AnimatedLoader>
      </BP>
    </AnimatedLoader>
    <div className="main-resume-body container blue-links">
      <AnimatedLoader className="fade-and-slide-up" waitMs={400}>
        <EducationAndWork />
      </AnimatedLoader>
    </div>
  </div>
);

export default Resume;
