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

    this.handleInput.bind(this);
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







  render() {
    if (this.state.rebrandedUrl) {
      return (
        <div id="masterContainer">
          <Rebranded url={this.state.rebrandedUrl} />
        </div>
      )
    } else {
      return (
        <div id='masterContainer'>
          <form onSubmit={(e) => { this.handleSubmit(e) }}>
            <label>URL: </label>
            <input type="text" onChange={(e) => { this.handleInput(e) }} value={this.state.input}></input>
          </form>
          <span className={`error ` + this.state.error ? `errorHidden` : `errorVisible`}>There was an error processing your request. Please try again!</span>
        </div >
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));