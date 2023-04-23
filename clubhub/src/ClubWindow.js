import {useState, useEffect} from "react";
import axios from "axios";
import ScrollElement from "./ScrollElement";

const ClubWindow = (props) => {

  const [data, setData] = useState();

  const getPostsData = () => {
    console.log('didthething');
    axios
      .get('localhost:4000/user/all_list') //THIS IS YOUR URL OF YOUR API
     .then((data) => setData(data.data)) //PROMISE API, THAT MEANS WHEN YOU GET THE DATA WHAT DO I DO WITH IT
      .catch((error) => console.log(error));  //ERROR CATCHING IN CASE WE RECIEVE AN ERROR
  };

  useEffect(() => {
    getPostsData();
  }, [])

  const [windowTitle, setTitle] = useState("starter");
  const [windowBody, setBody] = useState("values");
  const [windowId, setId] = useState("for");
  const [windowTag, setTag] = useState("this thing");

  const updateWindow = (props) => {

    setTitle(props.title);
    setBody(props.body);
    setId(props.id);
    setTag(props.tag);
  }

  // ====================
//console.log('the value of data is',data)
  return (
    <div style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
      {
        
        data && data.map(d =>
          <ScrollElement title={d.name} body={d.description} id={d._id} tags={d.tags} key = {d._id} updateFunction={updateWindow}/>
        )
      }
      <h5>selected should be between this=======</h5>
      <p>Selected Title: {windowTitle}</p>
      <p>Selected description: {windowBody}</p>
      <p>Selected Id: {windowId}</p>
      <p>Selected Tag: {windowTag}</p>
      <h5>and this=======</h5>
      
    </div>
  )

}
  
  export default ClubWindow;