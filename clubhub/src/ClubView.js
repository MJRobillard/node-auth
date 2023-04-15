import {useState} from "react";
import axios from "axios";

const ClubView = (props) => {
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
  
    const onSubmit = () => {
      console.log({
        id,
        title,
        body
      })
  
      axios.post('http://localhost:3002/post', {id,title,body}).then(props.getData());
    }
  
    return <div>
      <h3>
        This is the header for the view window for clubs
      </h3>
      
      <button style={{ marginTop: '4px'}} onClick={onSubmit}>
        Submit
      </button>
    </div>
  }
  
  export default ClubView;