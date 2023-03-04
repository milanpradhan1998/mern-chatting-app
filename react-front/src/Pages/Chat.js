import React, { useEffect, useState } from "react";
import axios from "axios";

function Chat() {
  const [chat, setChat] = useState([]);
  let fetchData = async () => {
    let { data } = await axios.get("http://localhost:7700/api/chat");
    setChat([...data]);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {chat.map((val, ind) => {
        return (
          <div key={ind}>
            <p>{val.chatName}</p>
          </div>
        );
      })}
    </>
  );
}
export default Chat;
