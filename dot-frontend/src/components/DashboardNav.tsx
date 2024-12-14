import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-bgr.png";

export const DashboardNav = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-auto h-16 flex justify-between items-center border-b-2 border-[#FF6363]">
        <div className="flex items-center mx-8">
          <img
            src={logo}
            className="h-10 w-10 mr-1 hover:cursor-pointer "
            onClick={() => {
              navigate("/dashboard");
            }}
            alt="logo"
          />
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className=" font-extrabold text-3xl hover:cursor-pointer"
          >
            DOT
          </div>
        </div>
        <div className="mx-3 h-16 flex items-center gap-6  w-64 my-3">
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="flex items-center justify-evenly gap-2 p-2  ml-6 h-9 w-auto rounded-lg text-white font-roboto hover:ease-in-out duration-200 bg-[#FF6363] hover:bg-[#504ea3] "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
            </svg>
            <div className="text-medium">Have a Team?</div>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-12 text-[#FF6363] hover:text-[#3734ff] hover:cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
