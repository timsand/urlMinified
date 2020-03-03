import React from "react";


const Rebranded = ({ url }) => {


  return (
    <div id="RebrandedContainer">
      <div id="RebrandedUrlContainer">
        <span>Success! Your new URL is: </span>
        <a href={`http://www.${url}`} >{url}</a>
      </div>
      <div id="RebrandedButtonContainer">
        <button id="RebrandedHomeButton">Another URL</button>
      </div>
    </div>
  )
}



export default Rebranded;