import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import Rebranded from "./Rebranded.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      error: false,
      rebrandedUrl: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.reset = this.reset.bind(this);
  }


  handleInput(e) {
    let input = e.target.value;
    this.setState({ input: input });
  }

  handleSubmit(e) {
    e.preventDefault();
    Axios.post("/miniurl", {
      destination: this.state.input
    })
      .then((res) => {
        let rebrandedUrl = res.data;
        this.setState({
          rebrandedUrl: rebrandedUrl,
          error: false
        })
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: true
        })
      })
  }

  reset() {
    this.setState({ input: '', error: false, rebrandedUrl: null })
  }


  render() {
    const errorMessage = this.state.error ? (<><span id="appErrorMessage">There was an error processing your request. Please try again!</span></>) : (null);
    if (this.state.rebrandedUrl) {
      return (
        <div id="masterContainer">
          <Rebranded url={this.state.rebrandedUrl} reset={this.reset} />
        </div>
      )
    } else {
      return (
        <div id='masterContainer'>
          <div id="appFormContainer">
            <form onSubmit={(e) => { this.handleSubmit(e) }}>
              <label>URL: </label>
              <input type="text" onChange={(e) => { this.handleInput(e) }} value={this.state.input}></input>
            </form>
            <button id="appPostButton" onClick={(e) => { this.handleSubmit(e) }}>Enter</button>
          </div>
          <div id="appErrorContainer">
            {errorMessage}
          </div>
        </div >
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));