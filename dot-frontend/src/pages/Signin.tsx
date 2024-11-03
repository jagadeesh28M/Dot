import boy from "../assets/pixelcut-export.png";
import { UserForm } from "../components/UserForm";

export const Signin = () => {
  return (
    <>
      <div className="grid grid-cols-2 h-screen relative overflow-hidden">
        <div className="bg-[#FFE8E0] h-full">
          <img
            src={boy}
            alt="an image of a boy"
            className="rounded-3xl absolute left-0 top-0 w-[64vw] h-full object-cover z-0"
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full w-auto z-1 relative">
          <UserForm type={"signin"} />
        </div>
      </div>
    </>
  );
};
