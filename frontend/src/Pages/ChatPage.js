import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = ({boxColor, handleColorChange}) => {
  const [fetchAgain, setFetchAgain] = useState(true);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && (
        <SideDrawer boxColor={boxColor} handleColorChange={handleColorChange} />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} boxColor={boxColor} />}
        {user && (
          <Chatbox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            boxColor={boxColor}
          />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
