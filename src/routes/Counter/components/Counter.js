import React from 'react'

class Title extends React.Component{
  constructor(props) {
    super(props)
    this.state = { text: 'Hello' }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ text: 'Counter' })
    }, 2000)
  }
  render() {
    return (<h2>{this.state.text}: {this.props.counter}</h2>)
  }
}


export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <Title counter={ props.counter } />
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
