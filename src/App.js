import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameboard: [
                  false, false, false, false, false, false, false, 
                  false, false, false, false, false, false, false,
                  false, false, false, false, false, false, false,
                  false, false, false, false, false, false, false,
                  false, false, false, false, false, false, false,
                  false, false, false, false, false, false, false
                ]
    }
  }

  placeCounter = index => {
    const gameboard = this.state.gameboard
    const changedState = [gameboard[index] = !gameboard[index]]
    this.setState({ ...gameboard, changedState})
  }

  render() {
    const gameboard = this.state.gameboard
    return (
      <div className="grid-container">
        {gameboard.map((square, index) => {
          return(
            <div key={index} className="grid" onClick={() => this.placeCounter(index)}>{square ? <div className="counter"></div> : <div className="blank"></div>}</div>
          )
        })}
      </div>
    )
  }
}

export default App
