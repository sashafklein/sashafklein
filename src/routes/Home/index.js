import React from 'react';
import { Link } from 'react-router';

import 'styles/core.scss';

const paths = ['Resume', 'Portfolio', 'Blog'];

export const Home = () => (
  <div className="landing">
    <div className="landing-buttons">
      {
        paths.map((path, index) => (
          <div className="landing-button" key={ index }>
            <div className="inner-text">
              <Link to={ path.toLowerCase() }>{ path }</Link>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

export default Home;
