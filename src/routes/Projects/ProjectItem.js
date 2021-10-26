import React from "react";
import PropTypes from "prop-types";
import Markdown from "components/Markdown";
import Image from "components/Image";

export const slug = title =>
  title
    .toLowerCase()
    .split(" ")
    .join("-");

export const PortfolioItem = ({ item }) => (
  <div className="portfolio-item">
    <div className="container content-section" id={slug(item.title)}>
      <div>
        <a target="blank" rel="noopener noreferrer" href={item.link}>
          <Image src={item.image} alt={item.title} />
        </a>
      </div>
      <div>
        <div className="port-header">
          <h1>{item.title}</h1>
          <h2>{item.subtitle}</h2>
          {item.bullets.length ? (
            <ul>
              {item.bullets.map(bullet => (
                <li key={bullet} className="bullet-tag">
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="markdown-container">
          {<Markdown source={item.text} />}
        </div>
      </div>
    </div>
  </div>
);

const { object } = PropTypes;
PortfolioItem.propTypes = {
  item: object
};

export default PortfolioItem;
