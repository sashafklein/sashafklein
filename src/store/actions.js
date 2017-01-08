export const locationChange = (location = '/') => ({
  type: 'LOCATION_CHANGE', location
});

export const toggleSetting = (key, value) => ({
  type: 'TOGGLE_SETTING', key, value
});
