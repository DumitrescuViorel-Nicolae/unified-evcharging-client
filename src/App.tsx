import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthProvider from "./AuthContext";
import NavBar from "./components/Navigation/NavBar";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <NavBar></NavBar>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
