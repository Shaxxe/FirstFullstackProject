import axios from "axios";
import { useCookies } from "react-cookie";

const BASE_URL = "http://127.0.0.1:8000";

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api-token-auth/`, {
        username: username,
        password: password,
      });

      setCookie("token", response.data.token);
      setCookie("user", username);
      axios.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
      return response.data;
    } catch (error) {
      throw new Error("Login failed. Please check your credentials."+error);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register/`, {
        username: username,
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      throw new Error("Registration failed. Please try again.:"+error);
    }
  };


  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout/`, {}, {
        headers: { Authorization: `Token ${cookies.token}` }
      });

      removeCookie("token");
      removeCookie("user");
    } catch (error) {
      throw new Error("Logout failed. Please try again.");
    }
  };
  const getUser = async () => {
    try {
      const token = cookies.token;
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/currentuser/`, config);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user details.\n" + error);
    }
  };

  const profileValues = async () => {
    const token = cookies.token;
  
   try {
    const response = await axios.get(`${BASE_URL}/auth/profilevalues/profile/`, {
      headers: {
        Authorization: `Token ${cookies.token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user values. \n" + error);
  }
  };
    return { login, logout, register, getUser, profileValues };
}