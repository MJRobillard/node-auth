import {useState} from "react";


const ScrollElement = (props) => {
    console.log(props.id, props.title, props.body, props.tags)
    const title = props.title;
    const id = props.id;
    const body = props.body;
    const tags = props.tags;
    return <div style={{ textAlign: 'left', marginBottom: '12px'}}>
      <h3>
        {props.title}
      </h3>
      <button onClick={() => {props.updateFunction(title, body, id ,tags)}}>
        Select
      </button>
    </div>
  }
  
  export default ScrollElement;