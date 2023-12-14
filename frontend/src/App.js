import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
import { useState, useEffect } from "react";

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const changeImage = () => {
      const randomNumber = Math.floor(Math.random() * 8) + 1;
      const imageUrl = `image${randomNumber}.jpg`;
      console.log(imageUrl);
      setBackgroundImage(`url(${imageUrl})`);
    };

    changeImage();

    const intervalId = setInterval(() => {
      changeImage();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="App" style={{ backgroundImage: backgroundImage }}>
      <Route path="/" component={Homepage} exact></Route>
      <Route path="/chats" component={ChatPage}></Route>
    </div>
  );
}

export default App;
