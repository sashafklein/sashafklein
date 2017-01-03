import React from 'react';
import { connect } from 'react-redux';
import { toggleSetting } from 'store/actions';

export const SkillOverlay = ({ skills, skillsTabOpen, dispatch }) => (
  <div>
    <div
      className={ `skills-tab ${skillsTabOpen ? 'left' : 'right'}` }
      onClick={ () => { dispatch(toggleSetting('skillsTabOpen', !skillsTabOpen)) } }
    >
      <i className="fa fa-chevron-left" />
    </div>

    <div className={ `skills-overlay ${skillsTabOpen ? 'open' : ''}` }>
      <div className="container">
        <div className="skills hide-small">
          {
            _.chunk(skills, 2).map((skillGroup, groupIndex) => (
              <div className="skills-row" key={ groupIndex }>
                {
                  skillGroup.map((skill, skillIndex) => (
                    <div
                      key={ skillIndex }
                      className="skill"
                      style={ { fontSize: `${skill.scale * 6}px`,  opacity: `${0.3 + (skill.scale / 10.0)}` } }
                    >
                      { skill.name }
                    </div>
                  ))
                }
                { skillGroup[1] ? null : <div className="skill" key="extra" /> }
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

const mapStateToProps = (state) => ({
  skills: state.data.skills,
  skillsTabOpen: state.settings.skillsTabOpen
});

export default connect(mapStateToProps)(SkillOverlay);