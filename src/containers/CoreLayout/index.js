import React from 'react';
import { connect } from 'react-redux';
import Meta from 'react-meta-tags';
import ReactGA from 'react-ga';

import { toggleSetting } from 'store/actions';

import { professionalTitle } from 'routes/Resume';
import Header from 'components/Header';
import Tab from 'components/Tab';
import NavMenu from 'routes/Home';

ReactGA.initialize('UA-117151476-1');

export class CoreLayout extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      this.props.dispatch(toggleSetting('navOpen', false));
    }, 0);
    this.trackVisit();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.location !== this.props.location) {
      this.props.dispatch(toggleSetting('tabOpen', false));
    }
    this.trackVisit();
  }

  componentWillUnmount () {
    this.props.dispatch(toggleSetting('tabOpen', false));
  }

  trackVisit () {
    if (window.location.href.indexOf('sashafklein.com') !== -1) {
      ReactGA.pageview(window.location.href);
    }
  }

  render () {
    const { children, className, navOpen } = this.props;

    const page = location.pathname.split('/')[1] || 'resume';

    const desc = {
      blog: 'Very occasional thoughts about coding, travel, and life.',
      projects: 'Saunas, web apps, and random junk.',
      resume: professionalTitle
    }[page];

    const title = `Sasha Klein - ${page[0].toUpperCase().concat(page.slice(1))}`;

    return (
      <div className={ className }>
        <Meta>
          <title>{ title }</title>
          <meta id="meta-description" name="description" content={ desc } />
          <meta id="og-title" property="og:title" content={ title } />
          <meta id="og-image" property="og:image" content="https://dl.dropboxusercontent.com/s/kbi6shbk5a5r54x/headshot2.jpg?dl=0" />
        </Meta>
        <Header />
        <div className={ `core-layout` }>
          { children }
        </div>
        <NavMenu open={ navOpen } />
        <Tab />
      </div>
    );
  }
};

const { element, string, func, bool, object } = React.PropTypes;
CoreLayout.propTypes = {
  children: element.isRequired,
  className: string,
  navOpen: bool,
  dispatch: func,
  location: object
};

CoreLayout.defaultProps = {
  className: ''
};

export default connect(s => ({ navOpen: s.settings.navOpen }))(CoreLayout);
