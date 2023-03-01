import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup, Heading } from "@chakra-ui/react";

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
      <Heading>Chat page</Heading>
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
