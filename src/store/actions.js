export const incrementCounter = (value = 1) => ({
  type: 'INCREMENT_COUNTER', value
})

export const locationChange = (location = '/') => ({
  type: 'LOCATION_CHANGE', location
})
