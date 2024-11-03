import { Input } from "./Input";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignUpInput } from "@jagadeesh28/dot";
import axios from "axios";
import { DATABASE_URL } from "../config";

interface inputType {
  type: string;
}

export const UserForm = ({ type }: inputType) => {
  const navigate = useNavigate();
  function toSignup() {
    navigate("/signup");
  }
  function toSignin() {
    navigate("/signin");
  }
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
      if (type == "signin") {
        if (userData.password.length <= 6 && userData.password != "") {
          setPasswordError(
            "Your password must be at least 6 characters long. Please try another."
          );
          return;
        } else {
          setPasswordError("");
        }
        if (userData.email == "" && userData.password == "") {
          setErrorMessage("Enter the Credentials");
          return;
        } else if (userData.email == "") {
          setErrorMessage("Enter the Email field");
          return;
        } else if (userData.password == "") {
          setErrorMessage("Enter the Password field");
          return;
        }
      } else {
        if (userData.password.length <= 6 && userData.password != "") {
          setPasswordError(
            "Your password must be at least 6 characters long. Please try another."
          );
          return;
        } else {
          setPasswordError("");
        }
        if (
          userData.email == "" &&
          userData.username == "" &&
          userData.password == ""
        ) {
          setErrorMessage("Enter the Credentials ");
          return;
        } else if (userData.username == "") {
          setErrorMessage("Enter the username Field");
          return;
        } else if (userData.email == "") {
          setErrorMessage("Enter the Email Field");
          return;
        } else if (userData.password == "") {
          setErrorMessage("Enter the password field");
          return;
        }
      }
      setLoading(true);
      const res = await axios.post(
        `${DATABASE_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`,
        userData
      );
      const jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      setLoading(false);
      navigate("/");
    } catch (e) {
      setLoading(false);
      if (type === "signin") {
        setErrorMessage(
          "Sorry, your password / Email was incorrect. Please double-check your Credentials."
        );
      } else {
        setErrorMessage(
          "An error occurred during signup. Enter a valid Email or  Please try again."
        );
      }
      console.log(e);
      return;
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        {type == "signin" ? "Sign In" : "Sign Up"}
      </h1>
      {type == "signup" && (
        <Input
          title={"Username"}
          phlabel={"jd123"}
          onChange={(e) => {
            setUserData({
              ...userData,
              username: e.target.value,
            });
            setErrorMessage("");
          }}
        />
      )}
      <Input
        title={"Email"}
        phlabel={"name@company.com"}
        onChange={(e) => {
          setUserData({
            ...userData,
            email: e.target.value,
          });
          setErrorMessage("");
        }}
      />
      <Input
        title={"Password"}
        phlabel={"***********"}
        type={"password"}
        onChange={(e) => {
          setUserData({
            ...userData,
            password: e.target.value,
          });
          setErrorMessage("");
          setPasswordError("");
        }}
      />
      {type == "signin" && (
        <div className="mt-4 mr-28 text-right w-5/6">
          <a
            href="#"
            className=" text-[#D98B00] underline hover:text-[#93733c]"
          >
            Forgot Passowrd?
          </a>
        </div>
      )}
      {passwordError && (
        <p className="text-red-700 font-bold bg-red-200 mt-3 p-3 rounded-lg">
          {passwordError}
        </p>
      )}
      {errorMessage && (
        <p className="text-red-700 font-bold bg-red-200 mt-3 p-3 rounded-lg">
          {errorMessage}
        </p>
      )}
      <Button
        label={type == "signup" ? "Sign Up" : "Sign In"}
        loading={loading}
        handleClick={sendData}
      />
      <div className="mt-3">
        {type == "signin"
          ? "Dont't have an account? "
          : "Already have an accoutn? "}
        {type == "signin" ? (
          <a
            onClick={toSignup}
            className="underline hover:cursor-pointer text-gray-400"
          >
            Sign Up here
          </a>
        ) : (
          <a
            onClick={toSignin}
            className="underline hover:cursor-pointer text-gray-400"
          >
            Sign In here
          </a>
        )}
      </div>
    </>
  );
};
