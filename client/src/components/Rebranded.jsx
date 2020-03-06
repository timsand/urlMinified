import React from "react";


const Rebranded = ({ url, reset }) => {


  return (
    <div id="RebrandedContainer">
      <div>
        <span>Success! Your new URL is: </span>
        <a href={`${url}`} >{url}</a>
      </div>
      <div id="RebrandedButtonContainer">
        <button id="RebrandedHomeButton" onClick={() => reset()}>Another URL</button>
      </div>
    </div>
  )
}



export default Rebranded;