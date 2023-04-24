import { useState, useEffect } from "react";
import axios from "axios";
import ScrollElement from "./ScrollElement";
import NewClub from "./NewClub";

const ClubWindow = (props) => {
  const [data, setData] = useState();
  const getPostsData = () => {
    console.log('didthething');
    axios
      .get('http://localhost:4000/user/all_list')
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const [windowTitle, setTitle] = useState("starter");
  const [windowBody, setBody] = useState("values");
  const [windowId, setId] = useState("for");
  const [windowTag, setTag] = useState("this thing");

  const updateWindow = (title, body, id, tags) => {
    setTitle(title);
    setBody(body);
    setId(id);
    setTag(tags);
  };

  return (
    <><div className="submit-form">
      <h5>This is the spot for the submit form</h5>

      <NewClub getData={getPostsData}></NewClub>
    </div><div className="club-window">
        {data &&
          data.map((d) => (
            <ScrollElement
              title={d.name}
              body={d.description}
              id={d._id}
              tags={d.tags}
              key={d._id}
              updateFunction={updateWindow} />
          ))}

      </div></>
  );
};

export default ClubWindow;

