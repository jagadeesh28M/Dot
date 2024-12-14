import { DashboardNav } from "../components/DashboardNav";
import { Pomodoro } from "../components/Pomodoro";
import { TodoData } from "../components/TodoData";

export const Dashboard = () => {
  return (
    <>
      <DashboardNav />
      <div className="grid grid-cols-2 h-auto w-full bg-[#ffe6c6]">
        <div className="grid grid-rows-2">
          <div className="bg-[#ffe6c6] p-8">
            <Pomodoro />
          </div>
          <div className="bg-[#ffe6c6] h-full p-6">
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
