import { Input } from "./Input";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useUserForm } from "../hooks/user"; // import the custom hook

interface InputType {
  type: "signin" | "signup";
}

export const UserForm = ({ type }: InputType) => {
  const navigate = useNavigate();
  const {
    userData,
    setUserData,
    errorMessage,
    setErrorMessage,
    setPasswordError,
    passwordError,
    loading,
    sendData,
  } = useUserForm(type);

  const toSignup = () => navigate("/signup");
  const toSignin = () => navigate("/signin");

  return (
    <>
      <div className="flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center ">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        <p className="text-[#4B5563] text-2xl font-roboto text-center my-4">
          {type == "signin"
            ? "Welcome back to DOT"
            : "Start your productivity journey with DOT"}
        </p>
      </div>
      {type === "signup" && (
        <Input
          title={"Username"}
          phlabel={"jd123"}
          onChange={(e) => {
            setUserData({ ...userData, username: e.target.value });
            setErrorMessage("");
          }}
        />
      )}
      <Input
        title={"Email"}
        phlabel={"name@company.com"}
        onChange={(e) => {
          setUserData({ ...userData, email: e.target.value });
          setErrorMessage("");
        }}
      />
      <Input
        title={"Password"}
        phlabel={"***********"}
        type={"password"}
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
          setPasswordError("");
          setErrorMessage("");
        }}
      />
      {type === "signin" && (
        <div className="mt-4 mr-28 text-right w-5/6">
          <a href="#" className="text-[#D98B00] underline hover:text-[#93733c]">
            Forgot Password?
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
        label={type === "signup" ? "Sign Up" : "Sign In"}
        loading={loading}
        handleClick={sendData}
      />
      <div className="mt-3">
        {type === "signin"
          ? "Don't have an account? "
          : "Already have an account? "}
        <a
          onClick={type === "signin" ? toSignup : toSignin}
          className="underline hover:cursor-pointer text-[#D98B00] hover:text-[#4b49d8]"
        >
          {type === "signin" ? "Sign Up here" : "Sign In here"}
        </a>
      </div>
    </>
  );
};
