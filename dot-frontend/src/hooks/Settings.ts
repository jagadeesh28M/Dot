import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../config";
import { useEffect, useState } from "react";

// Define types for response data
interface UserData {
  email: string;
  username: string;
}

export const useSettings = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(""); // Error for general fetch issues
  const [usernameLoading, setUsernameLoading] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Effect to load data or redirect to login
  useEffect(() => {
    if (!token) {
      navigate("/signin"); // Redirect if no token found
    } else {
      getData(); // Fetch user data on load
    }
  }, [token, navigate]); // Added token and navigate as dependencies

  // Fetch user data
  async function getData() {
    setLoading(true);
    try {
      const response = await axios.get<UserData>(
        `${DATABASE_URL}/api/v1/settings`,
        {
          headers: {
            token: token!,
          },
        }
      );
      setUserData({
        username: response.data.username,
        email: response.data.email,
      });
      setLoading(false);
    } catch (error: unknown) {
      setError("Error fetching data");
      setLoading(false);
      if (error instanceof Error) {
        console.error("Error fetching data", error.message);
      }
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
      const response = await axios.put<{ username: string }>(
        `${DATABASE_URL}/api/v1/settings/username/update`,
        { username: newUsername },
        {
          headers: {
            token: token!,
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
    } catch (error: unknown) {
      setUsernameLoading(false);
      if (error instanceof Error && (error as any).response) {
        const errorMsg = (error as any).response.data.message;
        if (errorMsg === "Username is already taken") {
          setUsernameError("Username is already taken");
        } else if (errorMsg) {
          setUsernameError(errorMsg);
        } else {
          setUsernameError("An error occurred while updating the username");
        }
      }
      console.error("Error updating username", error);
    }
  }

  // Update password logic
  async function updatePassword(currentPassword: string, newPassword: string) {
    try {
      const response = await axios.put<{ message: string }>(
        `${DATABASE_URL}/api/v1/settings/password/update`,
        { currentPassword, newPassword },
        {
          headers: {
            token: token!,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).response) {
        return { error: (error as any).response.data.message };
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
    updatePassword,
  };
};
