import React from 'react';
import { connect } from 'react-redux';

import SlideMenu from 'components/SlideMenu';
import { toggleSetting } from 'store/actions';

const skillComponent = (skill) => {
  const style = { margin: 0, lineHeight: `${skill.scale * 6 + 24}px` };
  const props = {
    className: 'skill',
    key: skill.name,
    style
  };

  return {
    2: <p className="small" { ...props }>{ skill.name }</p>,
    3: <p { ...props }>{ skill.name }</p>,
    4: <h5 { ...props }>{ skill.name }</h5>,
    5: <h4 { ...props }>{ skill.name }</h4>,
    6: <h3 { ...props }>{ skill.name }</h3>,
    7: <h2 { ...props }>{ skill.name }</h2>,
    8: <h1 { ...props }>{ skill.name }</h1>
  }[skill.scale.toString()];
}

export const SkillOverlay = ({ skills, dispatch }) => (
  <SlideMenu className="skills-overlay">
    <div>
      <h1 className="h0" style={ { textAlign: 'center', color: 'white' } }>(Tech) Skills</h1>
      <div className="skills">
        {
          skills.map((skill, skillIndex) => (
            <div className="skills-row" key={ skillIndex }>
              { skillComponent(skill) }
            </div>
          ))
        }
      </div>
    </div>
  </SlideMenu>
);

const { array, func } = React.PropTypes;
SkillOverlay.propTypes = {
  skills: array,
  dispatch: func
};

const mapStateToProps = state => ({
  skills: state.data.skills
});

export default connect(mapStateToProps)(SkillOverlay);