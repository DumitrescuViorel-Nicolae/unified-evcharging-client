import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { HomePage } from "./components/Navigation/Home";
import History from "./components/Account/History";
import LoadingScreen from "./components/Common/LoadingScreen";
import AccountDetails from "./components/Account/Account";
import ManageEVStations from "./components/Stations/ManageEVStations";
import MapGL from "./components/Map/Map";
import createSelectors from "./store/createSelectors";
import accountStore from "./store/UserStore/accountStore";

const colors = {
  primary: {
    600: "#f5f5f5",
  },
  complementary: {
    300: "#232323",
  },
  accent: {
    100: "#90ee90",
    200: "#32CD32",
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
  const useAccountStore = createSelectors(accountStore);
  const getUserLocation = useAccountStore.use.getGeolocation();
  getUserLocation();
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar />
        <LoadingScreen />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage-stations" element={<ManageEVStations />} />
          <Route path="/history" element={<History />} />
          <Route path="/account" element={<AccountDetails />} />
          <Route path="/session" element={<AccountDetails />} />
          <Route path="/map" element={<MapGL />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
