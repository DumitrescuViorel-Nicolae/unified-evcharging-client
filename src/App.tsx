import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { HomePage } from "./components/Navigation/Home";
import History from "./components/Account/History";

const colors = {
  primary: {
    600: "#f5f5f5",
  },
  complementary: {
    300: "#232323",
  },
  accent: {
    100: "#90ee90",
  },
};

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: "primary.600", // Set the background color for the entire app
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
