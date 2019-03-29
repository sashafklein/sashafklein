import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SlideMenu from 'components/SlideMenu';

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

export const SkillOverlay = ({ skills }) => (
  <SlideMenu className="skills-overlay">
    <div>
      <h1 className="h0" style={ { textAlign: 'center', color: 'white' } }>(Tech) Skills</h1>
      <div className="skills">
        {
          skills.map(skill => (
            <div className="skills-row" key={ skill.name }>
              { skillComponent(skill) }
            </div>
          ))
        }
      </div>
    </div>
  </SlideMenu>
);

const { array } = PropTypes;
SkillOverlay.propTypes = {
  skills: array
};

const mapStateToProps = state => ({
  skills: state.data.skills
});

export default connect(mapStateToProps)(SkillOverlay);
