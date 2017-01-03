import React from 'react';
import { Link } from 'react-router';
import Markdown from 'components/markdown';

const slug = title => title.toLowerCase().split(' ').join('-');

export class PortfolioItem extends React.Component {
  componentDidMount() {
    const { item } = this.props;
    if (location.hash && location.hash.includes(slug(item.title))) {
      setTimeout(() => {
        this.comp.scrollIntoView();
        setTimeout(() => {
          const scrolledY = window.scrollY;

          if (scrolledY) {
            window.scroll(0, scrolledY - 120);
          }
        }, 100);
      }, 800);
    }
  }

  render() {
    const { item } = this.props;
    return (
      <div
        className="portfolio-item container"
        ref={ el => this.comp = el }
      >
        <div className="sidebar black-links">
          <Link to={ item.link }>
            <img src={ item.image } className="port-photo" alt={ item.title } />
          </Link>
          <div className="show-medium">
            { item.bullets &&
                <ul className="port-list hide-medium">
                  {
                    item.bullets.map((bullet, bulletIndex) => (
                      <li key={ bulletIndex }>{ bullet }</li>
                    ))
                  }
                </ul>
            }
          </div>
        </div>
        <div className="content-section">
          <div className="port-header">
            <h1>{ item.title }</h1>
            <h2>{ item.subtitle }</h2>
          </div>
          <div className="markdown-container">
            {
              <Markdown source={ item.text } />
            }
          </div>
        </div>
      </div>
    );
  }
};

export default PortfolioItem;
