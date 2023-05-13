import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
//import NavScrollExample from "./NavBar/Navbar";
//import BasicExample from "./NavBar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar/NavBar";
import UploadForm from "./Components/UploadForm/UploadForm";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoList from "./Components/VideoList/VideoList";
import Homepage from "./Components/Homepage/homepage.jsx";
import UploadList from "./Components/Form/UploadList";
import MainHomePage from "./Components/MainHomePage/MainHomePage";
import Subscription from "./Components/Subscription/Subscription";
import LikedList from "./Components/LikedList/LikedList";
import EmailVerification from "./Components/EmailVerification/EmailVerification";
import HistoryList from "./Components/Histories/HistoryList";
import UserProfile from "./Components/UserProfile/UserProfile";
import './app.scss'


function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Signup />} />}
      <Route
        path="/verifyEmail/:id/:token"
        exact
        element={<EmailVerification />}
      />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/histories" exact element={<HistoryList />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/home" element={<MainHomePage />} />
      <Route path="/upload" element={<UploadForm />} />
      <Route path="/video/:id" element={<VideoPlayer />} />
      <Route path="subscriptions" element={<Subscription />} />
      <Route path="/liked" element={<LikedList />} />
      <Route path="/userDetails" element={<UserProfile />}></Route>
    </Routes>
  );
}

export default App;
