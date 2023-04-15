import {useState} from "react";


const Club = (props) => {
    console.log(props.id, props.title, props.body, props.urlOfClub)
    return <div style={{ textAlign: 'left', marginBottom: '12px'}}>
      <h3>
        {props.title}
      </h3>
      <p>{props.body}</p>
      <p>{props.urlOfClub}</p>
    </div>
  }
  
  export default Club;