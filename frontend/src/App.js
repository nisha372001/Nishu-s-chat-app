import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const location = useLocation();
  const boxColorp = location.state?.boxColor || "white";
  const [boxColor, setBoxColor] = useState(boxColorp);
  const handleColorChange = () => {
    boxColor === "black" ? setBoxColor("white") : setBoxColor("black");
  };
  console.log(boxColor);

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
      <Route path="/" exact>
        <Homepage boxColor={boxColor} handleColorChange={handleColorChange} />
      </Route>
      <Route path="/chats" component={ChatPage}>
        <ChatPage boxColor={boxColor} handleColorChange={handleColorChange} />
      </Route>
    </div>
  );
}

export default App;
