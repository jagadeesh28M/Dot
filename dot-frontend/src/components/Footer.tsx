import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-col justify-center items-center h-96 w-full opacity-100 bg-gradient-to-r from-[#FF6363] to-[#4F46E5] font-roboto pt-10 ">
        <h1 className="font-bold text-center text-white text-4xl pt-10 pb-3">
          Start Organizing Today
        </h1>
        <p className="text-2xl text-center font-normal text-white tracking-normal mt-3 opacity-90">
          Join thousands of productive professionals using DOT
        </p>
        <div className="flex justify-center items-center my-8">
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="bg-white tracking-wide text-2xl font-medium font-roboto text-[#FF6363]  hover:scale-110 ease-in-out duration-300 w-52 h-16 rounded-lg mb-10"
          >
            Try Now
          </button>
        </div>
      </div>
      <div className="flex items-center w-full h-16 bg-[#111827] text-[#D1D5DB] justify-between">
        <p className="ml-10">© 2024 DOT. All rights reserved.</p>
        <div className="flex justify-center items-center gap-6 mr-8">
          <div className=" hover:cursor-pointer hover:text-white">Terms</div>
          <div className=" hover:cursor-pointer hover:text-white">Privacy</div>
          <div className=" hover:cursor-pointer hover:text-white">Cookies</div>
        </div>
      </div>
    </>
  );
};
