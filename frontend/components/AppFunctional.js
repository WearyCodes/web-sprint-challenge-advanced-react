import React from 'react'
import { useState } from 'react'
import axios from 'axios'
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialError = ''

export default function AppFunctional(props) {

  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)
  const [error, setError] = useState(initialError)

  function getXY(idx) {
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
        x = 2;
        y = 1;
        break
      case 4:
        x = 2;
        y = 2;
        break
      case 5 :
        x = 2;
        y = 3;
        break
      case 6:
        x = 3;
        y = 1;
        break
      case 7:
        x = 3;
        y = 2;
        break
      case 8:
        x = 3;
        y = 3;
        break
    }
    return {x, y}
    // Use % ?
    // Use [arr] ?
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = getXY(index);
    setMessage(`Coordinates (${x}, ${y})`);
  }

  function reset() {
    setMessage(initialMessage)
    setEmail(initialEmail)
    setSteps(initialSteps)
    setIndex(initialIndex)
    setError(initialError)
  }

  function getNextIndex(direction) {
    switch (direction) {
      case 'up':
        return index - 3 >= 0 ? index - 3 : index;
      case 'down':
        return index + 3 < 9 ? index + 3 : index;
      case 'right':
        return (index + 1) % 3 !== 0 ? index + 1 : index;
      case 'left':
        return index % 3 !== 0 ? index - 1 : index;
      default:
        return index;
    }

    
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    
  }

  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    setIndex(nextIndex);
    setSteps(steps + 1);
    getXYMessage();
    
    // evt.target.id will be direction

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
    
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const submitInfo = {
      x: getXY(index).x,
      y: getXY(index).y,
      steps: steps,
      email: email,
    };

    axios.post('http://localhost:9000/api/result', submitInfo)
      .then(res => console.log(res))
      .catch(err => setError(err.response.data.message));
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{message}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        {error && <h3 id="message">{error}</h3>}
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
