import React from 'react';
import { connect } from 'react-redux';
import { toggleSetting } from 'store/actions';

const skillComponent = (skill) => {
  const style = { margin: 0, lineHeight: `${skill.scale * 6.5 + 12}px` };
  const props = {
    className: 'skill',
    key: skill.name,
    style
  };

  return {
    2: <small { ...props }>{ skill.name }</small>,
    3: <p { ...props }>{ skill.name }</p>,
    4: <h5 { ...props }>{ skill.name }</h5>,
    5: <h4 { ...props }>{ skill.name }</h4>,
    6: <h3 { ...props }>{ skill.name }</h3>,
    7: <h2 { ...props }>{ skill.name }</h2>,
    8: <h1 { ...props }>{ skill.name }</h1>
  }[skill.scale.toString()];
}

export const SkillOverlay = ({ skills, skillsTabOpen, dispatch }) => (
  <div>
    <div
      className={ `skills-tab ${skillsTabOpen ? 'up' : 'down'}` }
      onClick={ () => {
        dispatch(toggleSetting('skillsTabOpen', !skillsTabOpen))
      } }
    >
      <i className="fa fa-chevron-up" />
    </div>

    <div className={ `skills-overlay ${skillsTabOpen ? 'open' : ''}` }>
      <div className="container">
        <h1 className="section-header">Skills</h1>
        <div className="skills hide-medium">
          {
            _.chunk(skills, 2).map((skillGroup, groupIndex) => (
              <div className="skills-row" key={ groupIndex }>
                { skillGroup.map(skill => skillComponent(skill)) }
                { skillGroup[1] ? null : <div className="skill" key="extra" /> }
              </div>
            ))
          }
        </div>
        <div className="skills show-medium">
          {
            skills.map((skill, skillIndex) => (
              <div className="skills-row" key={ skillIndex }>
                { skillComponent(skill) }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  </div>
);

const { array, bool, func } = React.PropTypes;
SkillOverlay.propTypes = {
  skills: array,
  skillsTabOpen: bool,
  dispatch: func
};

const mapStateToProps = state => ({
  skills: state.data.skills,
  skillsTabOpen: state.settings.skillsTabOpen
});

export default connect(mapStateToProps)(SkillOverlay);