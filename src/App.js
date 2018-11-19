import React, { Component } from 'react'
import { PLAYER_1, PLAYER_2, EMPTY } from './Constants/gameboardConstants'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      whosTurnIsIt: PLAYER_1,
      gameboard: [
                  EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, 
                  EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
                  EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
                  EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
                  EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
                  EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY
                ]
    }
  }

  whichCounter = index => {
    switch(this.state.gameboard[index]) {
      case PLAYER_1:
        return <div className="counter red"></div>
      case PLAYER_2:
        return <div className="counter yellow"></div>
      case EMPTY:
        return <div className="counter blank"></div>
      default:
        return <div className="counter blank"></div>
    }
  }

  whosTurn = whosTurnIsItNow => {
    switch(whosTurnIsItNow) {
      case PLAYER_1:
        return PLAYER_2
      case PLAYER_2:
        return PLAYER_1
      case EMPTY:
        return PLAYER_1
      default:
        return EMPTY
    }
  }

  handleClick = indexToBeChanged => {
    const whosTurnIsItNow = this.state.whosTurnIsIt
    const oldGameBoard = this.state.gameboard
    const whosTurnIsIt = this.whosTurn(whosTurnIsItNow)
    const newGameboard = oldGameBoard.map((spot, index) => {
      if(index === indexToBeChanged) {
        spot = whosTurnIsItNow
      }
      return spot
    })
    const gameboard = this.falling(newGameboard, indexToBeChanged, whosTurnIsItNow)
    this.setState({ 
      gameboard,
      whosTurnIsIt
    })
  } 

  playersTurnCounter = () => 
    this.state.whosTurnIsIt === PLAYER_1 ? <div className="counter red"></div> : <div className="counter yellow"></div>

  falling = (arr, position, constant) => {
    const widthOfGrid = 7
    const orignalPosition = position
    for(let i = position; i < arr.length; i += widthOfGrid) {
      if(arr[position + widthOfGrid] === EMPTY) {
        position += widthOfGrid
        arr[orignalPosition] = EMPTY
      }
    }
    arr[position] = constant
    return arr
  }

  render() {
    const gameboard = this.state.gameboard
    const whosTurnIsIt = this.state.whosTurnIsIt
    return (
      <div>
        <h1>Connect 4</h1>
        <p>{whosTurnIsIt}: {this.playersTurnCounter()}</p>
        <div className="grid-container">
          {gameboard.map((square, index) => {
            const counter = this.whichCounter(index)
            return(
              <div key={index} className="grid" onClick={() => this.handleClick(index)}>{counter}</div>
            )
          })}
        </div>  
      </div>
    )
  }
}

export default App
