import { useState } from "react";
import axios from "axios";
import { DATABASE_URL } from "../config";
import { SignUpInput } from "@jagadeesh28/dot";
import { useNavigate } from "react-router-dom";

export const useUserForm = (type: "signin" | "signup") => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<SignUpInput>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendData = async () => {
    try {
      if (type === "signin") {
        if (!validateSignin()) return;
      } else {
        if (!validateSignup()) return;
      }

      setLoading(true);
      const res = await axios.post(
        `${DATABASE_URL}/api/v1/user/${type}`,
        userData
      );
      if (res.status == 400) {
        setErrorMessage("Username or email is already taken");
      }
      const jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
      setLoading(false);
    } catch (e: unknown) {
      setLoading(false);
      if (e.status == 400) {
        setErrorMessage(e.response.data.msg);
        return;
      }
      setErrorMessage(
        type === "signin"
          ? "Sorry, your password / Email was incorrect. Please double-check your credentials."
          : "An error occurred during signup. Enter a valid Email or Please try again."
      );
    }
  };

  const validateSignin = () => {
    if (userData.password.length < 5 && userData.password) {
      setPasswordError("Your password must be at least 6 characters long.");
      return false;
    }
    if (!userData.email || !userData.password) {
      setErrorMessage("Enter the credentials.");
      return false;
    }
    setPasswordError("");
    setErrorMessage("");
    return true;
  };

  const validateSignup = () => {
    if (userData.password.length <= 5 && userData.password) {
      setPasswordError("Your password must be at least 6 characters long.");
      return false;
    }
    if (!userData.username || !userData.email || !userData.password) {
      setErrorMessage("Enter all fields.");
      return false;
    }
    setPasswordError("");
    setErrorMessage("");
    return true;
  };

  return {
    userData,
    setUserData,
    errorMessage,
    setErrorMessage,
    setPasswordError,
    passwordError,
    loading,
    sendData,
  };
};
