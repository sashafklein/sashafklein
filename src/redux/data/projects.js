import raw from "raw.macro";

import LCS from "assets/img/LCS-1.jpg";
import OSET from "assets/img/oset.jpg";
import planit from "assets/img/planit.gif";
import meatup from "assets/img/meatup.jpg";
import tweed from "assets/img/tweed.gif";
import gems from "assets/img/gems.jpg";
import npms from "assets/img/npms.jpg";
import owl from "assets/img/owl.gif";

export default [
  {
    bullets: [],
    image: LCS,
    link: "http://leftcoastsauna.com",
    subtitle: "Building community through sweat",
    text: raw("./markdown/projects/leftcoastsauna.md"),
    title: "Left Coast Sauna"
  },
  {
    bullets: ["React Native", "Open Source"],
    image: OSET,
    link: "https://github.com/sashafklein/ballot-marker",
    subtitle: "An accessible multi-platform ballot-marking tool",
    text: raw("./markdown/projects/ballot.md"),
    title: "OSET Ballot Marker"
  },
  {
    bullets: ["Angular", "Rails", "SPA", "Scraping", "Leaflet", "TDD"],
    image: planit,
    subtitle: "Friend-approved travel",
    text: raw("./markdown/projects/planit.md"),
    title: "PlanIt"
  },
  {
    bullets: ["E-Commerce", "Rails", "PostgreSQL"],
    image: meatup,
    subtitle: "Outside-the-box thinking on meat CSAs",
    text: raw("./markdown/projects/meatup.md"),
    title: "MeatUp"
  },
  {
    bullets: ["Meteor", "MongoDB"],
    image: tweed,
    subtitle: "Polished and feature-rich Meteor-powered chat",
    text: raw("./markdown/projects/tweed.md"),
    title: "Tweed"
  },
  {
    bullets: ["Node", "React", "Redux", "JavaScript", "Testing", "Open Source"],
    image: npms,
    link: "https://github.com/sashafklein/shape",
    subtitle: "AVA Describe, Shape, Redux Request Manager, and RS Components",
    text: raw("./markdown/projects/npm.md"),
    title: "NPM Packages"
  },
  {
    bullets: ["Rails", "Ruby", "PostgreSQL", "Deployment", "Open Source"],
    image: gems,
    link: "https://github.com/sashafklein/me_first",
    subtitle: "PG Clone, MeFirst, and Falcon Deploy",
    text: raw("./markdown/projects/gems.md"),
    title: "Ruby Gems"
  },
  {
    bullets: ["Sendgrid", "Rails"],
    image: owl,
    subtitle: "Simple daily email-based inspiration",
    text: raw("./markdown/projects/owl.md"),
    title: "Quote Owl"
  }
];
