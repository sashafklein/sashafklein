/**
 * Changes the active breakpoint
 *
 * @param {string} breakpointName          String defining the active breakpoint
 * @param {number} breakpointSize          Number defining the active breakpoint
 * @return {Object} Action object
 */
export const setActiveBreakpoint = (breakpointName, breakpointSize) => ({
  type: "SET_ACTIVE_BREAKPOINT",
  breakpointName,
  breakpointSize
});

export const locationChange = (location = "/") => ({
  type: "LOCATION_CHANGE",
  location
});

export const toggleSetting = (key, value) => ({
  type: "TOGGLE_SETTING",
  key,
  value
});

export const toggleOpenItem = id => ({
  type: "TOGGLE_OPEN_ITEM",
  id
});
