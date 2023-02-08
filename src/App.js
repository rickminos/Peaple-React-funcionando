import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import TimeLine from "./components/pages/TimeLine";
import Users from "./components/pages/Users";
import Profile from "./components/pages/Profile";
import CreatePost from "./components/pages/CreatePost";

import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/timeline/:id" element={<TimeLine />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newpost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
