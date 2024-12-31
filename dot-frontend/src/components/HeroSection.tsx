import { useNavigate } from "react-router-dom";
import network from "../assets/network.png";
import rocket from "../assets/rocket.png";
import org from "../assets/org.png";
import eye from "../assets/eye.png";
import plus from "../assets/plus.png";
import organize from "../assets/organize.png";
import graph from "../assets/graph.png";
import { Card } from "../components/Card";
import { StepsCard } from "./StepsCard";
export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-auto w-auto flex justify-around items-center mx-8 my-16 font-roboto">
        <div className="flex-col justify-center h-96 w-auto">
          <div className="font-extrabold text-6xl font-roboto mb-2">
            Redefine Productivity with,
          </div>
          <div className="text-6xl font-roboto font-extrabold text-[#FF6363]">
            DOT<span className="text-black">:The Endpoint of Every Task.</span>
          </div>
          <div className="font-roboto text-2xl font-normal my-7 leading-relaxed  text-[#6B7280]">
            Transform your productivity with DOT's intuitive task management
            system. <br /> Visualize your progress, organize effortlessly, and
            achieve more.
          </div>
          <div className="h-auto w-auto flex items-center gap-8 my-10">
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="bg-[#FF6363] tracking-wide text-2xl font-roboto text-white hover:bg-[#4b49d8] hover:scale-110 ease-in-out duration-300 w-52 h-16 rounded-lg"
            >
              Try Now
            </button>
            <button className="racking-wide text-2xl font-roboto flex items-center gap-2 border-2 justify-center text-[#374151] hover:bg-gray-200 hover:scale-110 ease-in-out duration-300 w-52 h-16 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
        <img
          className="rounded-3xl"
          src={network}
          height={579}
          width={688}
          alt=""
        />
      </div>
      {/* Features Section */}
      <div className="flex items-center justify-evenly bg-[#F9FAFB] w-full h-80">
        <Card
          img={eye}
          title={"Visual Task Management"}
          des={
            "See your tasks come to life with our intuitive dot-based visualization system."
          }
        />
        <Card
          img={org}
          title={"Intuitive Organization"}
          des={
            "Organize tasks naturally with our smart categorization and grouping features."
          }
        />
        <Card
          img={rocket}
          title={"Enhanced Productivity"}
          des={
            "Boost your efficiency with our proven task management methodology."
          }
        />
      </div>
      {/* How it works Section */}
      <div className=" h-96 w-full font-roboto">
        <h1 className="font-bold text-center text-5xl py-3 mt-10 ">
          How Dot Works
        </h1>
        <p className="text-xl text-center font-normal text-[#6B7280] tracking-wide">
          Three simple steps to transform your productivity
        </p>
        <div className="w-full h-auto flex justify-evenly items-center">
          <StepsCard
            img={plus}
            title={"Create Tasks"}
            des={"Quickly add tasks and organize them into visual dots."}
          />
          <StepsCard
            img={organize}
            title={"Organize Visually"}
            des={"Arrange your tasks using our intuitive dot system."}
          />
          <StepsCard
            img={graph}
            title={"Track Progress"}
            des={"Monitor your productivity and celebrate achievements."}
          />
        </div>
      </div>
    </>
  );
};
