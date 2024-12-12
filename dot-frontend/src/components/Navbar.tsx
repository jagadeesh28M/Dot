import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-bgr.png";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-auto h-16 flex justify-between items-center border-b-2 border-slate-100">
        <div className="flex items-center mx-8">
          <img
            src={logo}
            className="h-10 w-10 mr-1 hover:cursor-pointer "
            onClick={() => {
              navigate("/");
            }}
            alt="logo"
          />
          <div
            onClick={() => {
              navigate("/");
            }}
            className=" font-extrabold text-3xl hover:cursor-pointer"
          >
            DOT
          </div>
        </div>
        <div className="mx-10 h-16 flex items-center  w-52 my-3">
          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="text-[#6B7280] h-9 w-32 p-1 font-roboto rounded-lg hover:bg-gray-100"
          >
            Sign in
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="ml-6 h-9 w-32 rounded-lg text-white font-roboto bg-[#FF6363] hover:bg-[#3734ff] "
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};
