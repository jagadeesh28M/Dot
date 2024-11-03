import boy from "../assets/boy_prev_ui.png";
import { UserForm } from "../components/UserForm";

export const Signup = () => {
  return (
    <>
      <div className="grid grid-cols-2 h-screen relative overflow-hidden">
        <div className="flex flex-col justify-center items-center h-full w-auto z-10 relative">
          <UserForm type={"signup"} />
        </div>
        <div className="bg-[#FFE8E0] h-full">
          <img
            src={boy}
            alt="an image of a boy"
            className="rounded-3xl absolute -right-48  -top-10 w-auto scale-200  h-full object-cover z-0"
          />
        </div>
      </div>
    </>
  );
};
