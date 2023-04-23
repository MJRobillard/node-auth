import {useState, useEffect} from "react";
import axios from "axios";
import ScrollElement from "./ScrollElement";

const ClubWindow = (props) => {

  const [data, setData] = useState();

  const getPostsData = () => {
    console.log('didthething');
    axios
      .get('http://localhost:3002/posts') //THIS IS YOUR URL OF YOUR API
     .then((data) => setData(data.data)) //PROMISE API, THAT MEANS WHEN YOU GET THE DATA WHAT DO I DO WITH IT
      .catch((error) => console.log(error));  //ERROR CATCHING IN CASE WE RECIEVE AN ERROR
  };

  useEffect(() => {
    getPostsData();
  }, [])

  const [windowTitle, setTitle] = useState();
  const [windowBody, setTitle] = useState();
  const [windowId, setTitle] = useState();
  const [windowUrlOfClub, setTitle] = useState();

  // ====================
//console.log('the value of data is',data)
  return (
    <div style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
      {
        data && data.map(d =>
          <ScrollElement title={d.title} body={d.body} urlOfClub={d.urlOfClub} id={d.id}/>
        )
      }

      <NewPost getData={getPostsData} />
    </div>
  )

}
  
  export default ClubWindow;