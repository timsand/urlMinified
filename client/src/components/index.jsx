import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: ''
    };

    this.handleInput.bind(this);
  }


  handleInput(e) {
    let input = e.target.value;
    this.setState({ input: input });
  }

  handleSubmit(e) {
    e.preventDefault();
    Axios.post("/miniurl", {
      stuff: 'dafsdfsfsf'
    })
  }







  render() {
    return (
      <div>
        <form onSubmit={(e) => { this.handleSubmit(e) }}>
          <label>URL: </label>
          <input type="text" onChange={(e) => { this.handleInput(e) }} value={this.state.input}></input>
        </form>
      </div >
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));