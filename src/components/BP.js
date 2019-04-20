import { connect } from "react-redux";

import { breakpoints } from "utils/responsiveHelpers";

const BP = ({ type, name, bp, children }) => {
  const bpNames = Object.keys(breakpoints);
  const diff = bpNames.indexOf(bp.name) - bpNames.indexOf(name);
  const show = type === "above" ? diff < 0 : diff > 0;
  return show ? children : null;
};

export default connect(s => ({ bp: s.breakpoint }))(BP);
