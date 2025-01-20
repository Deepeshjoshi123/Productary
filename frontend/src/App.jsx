import { useState } from "react";
import { Navbar } from "./Component/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box
      bgGradient="to-r"
      gradientFrom="gray.700"
      gradientMiddle="green.500"
      gradientTo="blue.600"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Navbar />
      <Box flex="1">
        {" "}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
