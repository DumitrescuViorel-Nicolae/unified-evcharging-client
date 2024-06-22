import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { HomePage } from "./components/Navigation/Home";
import History from "./components/Account/History";
import LoadingScreen from "./components/Common/LoadingScreen";
import AccountDetails from "./components/Account/Account";
import ManageEVStations from "./components/Stations/ManageEVStations";
import MapGL from "./components/Map/Map";
import createSelectors from "./store/createSelectors";
import accountStore from "./store/UserStore/accountStore";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import ContactUsForm from "./components/Footer/Contact";
import FrequestQuestions from "./components/Footer/FAQ";
import { LikedLocations } from "./components/Account/LikedLocations";

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
  const getSavedLocations = useAccountStore.use.getSavedLocations();

  useEffect(() => {
    getUserLocation();
    getSavedLocations();
  }, [getSavedLocations, getUserLocation]);

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Router>
          <NavBar />
          <LoadingScreen />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manage-stations" element={<ManageEVStations />} />
              <Route path="/history" element={<History />} />
              <Route path="/account" element={<AccountDetails />} />
              <Route path="/liked" element={<LikedLocations />} />
              <Route path="/session" element={<AccountDetails />} />
              <Route path="/map" element={<MapGL />} />
              <Route path="/contact" element={<ContactUsForm />} />
              <Route path="/faq" element={<FrequestQuestions />} />
            </Routes>
          </Box>
          <Footer />
        </Router>
      </Box>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
