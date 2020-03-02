import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

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
          rebrandedUrl: rebrandedUrl
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