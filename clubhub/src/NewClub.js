import {useState} from "react";
import axios from "axios";

const NewClub = (props) => {
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = () => {
    console.log({
      title,
      body,
      tag
    })
    axios.post('http://localhost:4000/user/clubsignup', {name: title, tags: tag, description: body})
         .then(props.getData());
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Description" value={body} onChange={e => setBody(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Tag" value={tag} onChange={e => setTag(e.target.value)} />
      </div>
      <button style={{ marginTop: '4px'}} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}

export default NewClub;
