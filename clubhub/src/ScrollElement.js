import {useState} from "react";


const ScrollElement = (props) => {
    console.log(props.id, props.title, props.body, props.urlOfClub)
    return <div style={{ textAlign: 'left', marginBottom: '12px'}}>
      <h3>
        {props.title}
      </h3>
      <button>
        Select
      </button>
    </div>
  }
  
  export default ScrollElement;