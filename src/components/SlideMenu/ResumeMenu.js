import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AnimatedLoader from 'components/AnimatedLoader';

const skillComponent = (skill) => {
  const style = { margin: 0, lineHeight: `${skill.scale * 6 + 24}px` };
  const props = {
    className: 'skill',
    key: skill.name,
    style
  };

  return {
    1: <p { ...props } className="skill xs">{ skill.name }</p>,
    2: <p { ...props } className="skill small">{ skill.name }</p>,
    3: <p { ...props }>{ skill.name }</p>,
    4: <h5 { ...props }>{ skill.name }</h5>,
    5: <h4 { ...props }>{ skill.name }</h4>,
    6: <h3 { ...props }>{ skill.name }</h3>,
    7: <h2 { ...props }>{ skill.name }</h2>,
    8: <h1 { ...props }>{ skill.name }</h1>
  }[skill.scale.toString()];
};

export const SkillOverlay = ({ skills, tabOpen }) => (
  <div className="skills-overlay">
    <div className="skills">
      <h1 className="h0" style={ { textAlign: 'center', color: 'white' } }>Skills</h1>
      {
        tabOpen && skills.map((skill, index) => (
          <AnimatedLoader
            className="skills-row fade-and-slide-up"
            key={ skill.name }
            waitMs={ 200 + index * 50 }
          >
            { skillComponent(skill) }
          </AnimatedLoader>
        ))
      }
    </div>
  </div>
);

const { array, bool } = PropTypes;
SkillOverlay.propTypes = {
  skills: array,
  tabOpen: bool
};

const mapStateToProps = state => ({
  skills: state.data.skills,
  tabOpen: state.settings.tabOpen
});

export default connect(mapStateToProps)(SkillOverlay);
