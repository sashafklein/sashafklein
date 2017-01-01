import React from 'react';

import Header from 'components/Header';

export const CoreLayout = ({ children, className }) => (
  <div className={ className }>
    <Header />
    <div className='core-layout__viewport'>
      { children }
    </div>
  </div>
);

const { element, string } = React.PropTypes;
CoreLayout.propTypes = {
  children: element.isRequired,
  className: string
};

CoreLayout.defaultProps = {
  className: ''
};

export default CoreLayout;
