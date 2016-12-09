import React from 'react'

const Title = (props) =>(
  <h2>{props.text}: {props.counter}</h2>
)

let text = ''
setTimeout(() => {
  text = 'Counter'
}, 200)

export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <Title text={ text } counter={ props.counter } />
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default Counter
