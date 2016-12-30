export const incrementCounter = (value = 1) => ({
  type: 'INCREMENT_COUNTER', value
})

export const decrementCounter = (value = 1) => ({
  type: 'DECREMENT_COUNTER', value
})

export const locationChange = (location = '/') => ({
  type: 'LOCATION_CHANGE', location
})
