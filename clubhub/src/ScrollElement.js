import {useState} from "react";


const ScrollElement = (props) => {
    console.log(props.id, props.title, props.body, props.tags)
    const title = props.title;
    const id = props.id;
    const body = props.body;
    
    const tags = props.tags;
    return <div style={{ textAlign: 'left', marginBottom: '12px'}}>
      <h2>
        {props.title}
      </h2>
      <h3>
        {props.body}
      </h3>
      <h3>
        {props.tags}
      </h3>
      <button onClick={() => {
  console.log('Button clicked!');
  props.updateFunction(title, body, id, tags);
}}>
  Get The club INfo
</button>
    </div>
  }
  
  export default ScrollElement;