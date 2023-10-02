import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./static/css/Blog.css";
import Header from "./Pages/Header";
import Footer from "./Pages/Footer";
import Blog from "./Pages/Blog";
import { useAuth } from "./Components/Api";
import Login from "./Components/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Register from "./Components/Register";
import RegisterSuccessful from "./Pages/RegisterSuccessful";
import BlogDetail from "./Pages/BlogDetail";
import BlogCreate from "./Components/BlogCreate";
import Profile from "./Pages/Profile";
import ProfileChange from "./Components/ProfileChange";

const App = () => {
  const navigate = useNavigate();
  const { login, logout, register, getUser } = useAuth();

  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (cookies.token) {
          const user = await getUser();
          setUsername(user.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [cookies.token]);


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      setUsername(null);
    } catch (error) {
      console.log("Logout failed: ", error);
    }
  };

  const handleRegister = (username, email, password) => {
    register(username, email, password)
      .then(() => {
        navigate("/successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      setUsername(username);
      navigate("/protected");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header username={username} />
      <Routes>
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/create" element={<BlogCreate username={username} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/protected" element={<ProtectedRoute onLogout={handleLogout} username={username} />} />
        <Route path="/" element={<Blog />} />
        <Route path="/profile" element={<Profile username={username}/>}/>
        <Route path="/profile/change" element={<ProfileChange/>} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/successful" element={<RegisterSuccessful />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;