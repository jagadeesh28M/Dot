import { useNavigate } from "react-router-dom";
import { DashboardNav } from "../components/DashboardNav";
import { Pomodoro } from "../components/Pomodoro";
import { TodoData } from "../components/TodoData";
import { useEffect } from "react";

export const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <>
      <DashboardNav />
      <div className="grid grid-cols-2 h-auto w-full bg-[#FFE6D1]">
        <div className="grid grid-rows-2">
          <div className="bg-[#FFE6D1] p-8">
            <Pomodoro />
          </div>
          <div className="bg-[#FFE6D1] h-full p-6">
            <div className="w-full h-full p-2 rounded-xl  bg-white ">
              <div className="w-full h-full bg-red-800 rounded-3xl">
                <iframe
                  className="border-radius:12px"
                  src="https://open.spotify.com/embed/artist/2CDApyOON0pYv8fWwC9U7i?utm_source=generator"
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <TodoData />
        </div>
      </div>
    </>
  );
};
