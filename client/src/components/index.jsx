import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }







  render() {
    return (
      <div>
        <form>
          <label>URL: </label>
          <input type="text"></input>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));