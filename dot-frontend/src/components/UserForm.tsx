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
    passwordError,
    loading,
    sendData,
  } = useUserForm(type);

  const toSignup = () => navigate("/signup");
  const toSignin = () => navigate("/signin");

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        {type === "signin" ? "Sign In" : "Sign Up"}
      </h1>
      {type === "signup" && (
        <Input
          title={"Username"}
          phlabel={"jd123"}
          onChange={(e) => {
            setUserData({ ...userData, username: e.target.value });
          }}
        />
      )}
      <Input
        title={"Email"}
        phlabel={"name@company.com"}
        onChange={(e) => {
          setUserData({ ...userData, email: e.target.value });
        }}
      />
      <Input
        title={"Password"}
        phlabel={"***********"}
        type={"password"}
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
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
          className="underline hover:cursor-pointer text-gray-400"
        >
          {type === "signin" ? "Sign Up here" : "Sign In here"}
        </a>
      </div>
    </>
  );
};
