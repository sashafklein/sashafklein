import SkillsOverlay from './SkillsOverlay';
import Headshot from './Headshot';
import EducationAndWork from './EducationAndWork';

const skillsList = null; //TODO

//        - @skills.in_groups_of(2).each do |skill_group|
//        <div className="skills-row">
//            - skill_group.each do |skill|
//              - if skill
//              <div className="skill{ style: "font-size:#{skill.stars * 5}px; opacity: #{0.3 + (skill.stars / 10.0)}"}= skill.name">
//              - else
//              <div className="skill">
//
export const Resume = () => (
  <div className="resume-container undecorated">
      <SkillsOverlay />
    <div className="header-area">
      <div className="container med-and-up header-container">
        <Headshot />
        <div className="header-text-section">
          <div className="name-and-icons">
            <h1 className="name">Sasha Klein</h1>
            <div className="link-icons">
              <Link to='https://git.io/sasha'>
                <i className="fa fa-github" />
              </Link>
              <Link to='https://www.linkedin.com/pub/sasha-klein/34/595/1b5'>
                <i className="fa fa-linkedin-square" />
              </Link>
              <Link to='http://stackoverflow.com/users/1408935/sasha'>
                <i className="fa fa-stack-overflow" />
              </Link>
              <Link to='/contact'>
                <i className="fa fa-envelope-o" />
              </Link>
            </div>
          </div>
          <h2 className="self-description">Web and Mobile Developer</h2>
        </div>
      </div>
    </div>
    <div className="main-resume-body container blue-links">
        <EducationAndWork />
      <div className="show-medium">
        <h1 className="section-header">Skills</h1>
      </div>
      <div className="skills">
        { skillsList }
      </div>
    </div>
  </div>
);

export default Resume;
