import { Route, Routes } from "react-router-dom";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home";
import "./CSS/main.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
