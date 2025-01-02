import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../config";
import { useEffect, useState } from "react";

export const useSettings = () => {
  const [userData, setUserData] = useState({ email: "", username: "" });
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [usernameLoading, setUsernameLoading] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin"); // Redirect if no token found
    } else {
      getData(); // Fetch user data on load
    }
  }, []);

  // Fetch user data
  async function getData() {
    setLoading(true);
    try {
      const response = await axios.get(`${DATABASE_URL}/api/v1/settings`, {
        headers: {
          token: token,
        },
      });
      setUserData({
        username: response.data.username,
        email: response.data.email,
      });
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
      console.error("Error fetching data", error);
    }
  }

  // Update username with separate loader
  async function updateUsername(newUsername: string) {
    if (!newUsername) {
      setUsernameError("Username cannot be empty");
      return;
    }

    setUsernameLoading(true); // Show loader when updating username
    setUsernameError(""); // Clear any previous error

    try {
      const response = await axios.put(
        `${DATABASE_URL}/api/v1/settings/username/update`,
        { username: newUsername },
        {
          headers: {
            token: token,
          },
        }
      );
      setUserData((prev) => ({
        ...prev,
        username: response.data.username,
      }));
      setSuccess(true);
      setUsernameLoading(false);
      setUsernameError("");
    } catch (error) {
      setUsernameLoading(false);
      if (error.response.data.message === "Username is already taken") {
        setUsernameError("Username is already taken");
      } else if (error.response && error.response.data.message) {
        setUsernameError(error.response.data.message);
      } else {
        setUsernameError("An error occurred while updating the username");
      }
      console.error("Error updating username", error);
    }
  }

  // Update password logic
  async function updatePassword(currentPassword: string, newPassword: string) {
    try {
      const response = await axios.put(
        `${DATABASE_URL}/api/v1/settings/password/update`,
        { currentPassword, newPassword },
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return { error: error.response.data.message };
      }
      return { error: "An error occurred while updating the password" };
    }
  }

  return {
    userData,
    loading,
    error,
    success,
    usernameLoading,
    usernameError,
    updateUsername,
    updatePassword, // Add updatePassword to hook return
  };
};
