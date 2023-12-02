import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialError = ''

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  error: initialError
}

export default class AppClass extends React.Component {

  constructor(){
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      error: initialError
    }
  }

  getXY = (idx) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x = 0
    let y = 0
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    switch (idx) {
      case 0:
        x = 1;
        y = 1;
        break
      case 1: 
        x = 2;
        y = 1;
        break
      case 2:
        x = 3;
        y = 1;
        break
      case 3:
        x = 1;
        y = 2;
        break
      case 4:
        x = 2;
        y = 2;
        break
      case 5 :
        x = 3;
        y = 2;
        break
      case 6:
        x = 1;
        y = 3;
        break
      case 7:
        x = 2;
        y = 3;
        break
      case 8:
        x = 3;
        y = 3;
        break
    }
    return {x, y}
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = this.getXY(this.state.index);
    this.setState({...this.state, message: `Coordinates (${x}, ${y})`});
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState)
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    switch (direction) {
      case 'up':
        return this.state.index - 3 >= 0 ? this.state.index - 3 : this.state.index;
      case 'down':
        return this.state.index + 3 < 9 ? this.state.index + 3 : this.state.index;
      case 'right':
        return (this.state.index + 1) % 3 !== 0 ? this.state.index + 1 : this.state.index;
      case 'left':
        return this.state.index % 3 !== 0 ? this.state.index - 1 : this.state.index;
      default:
        return this.state.index;
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);
    this.setState(
      (prevState) => ({
        ...prevState,
        index: nextIndex,
        steps: prevState.steps + 1, // Update steps
      }),
      () => {
        this.getXYMessage(); // Call getXYMessage after updating the state
      }
    );
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({...this.state, email: evt.target.value})
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const submitInfo = {
      x: this.getXY(this.state.index).x,
      y: this.getXY(this.state.index).y,
      steps: this.state.steps,
      email: this.state.email,
    };

    axios.post('http://localhost:9000/api/result', submitInfo)
      .then(res => console.log(res))
      .catch(err => this.setState({...this.state, error: err.response.data.message}));
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.state.message}</h3>
          <h3 id="steps">You moved {this.state.steps} time{this.state.steps > 1 || this.state.steps === 0 ? `s` : ''}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          {this.state.error && <h3 id="message">{this.state.error}</h3>}
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit = {this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
