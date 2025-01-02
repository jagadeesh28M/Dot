import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-bgr.png";
import { useEffect, useState } from "react";

export const DashboardNav = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement; // Cast event.target to HTMLElement
    if (target && !target.closest("#dropdownButton")) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener to close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="w-auto h-16 flex justify-between items-center border-b-2 border-[#fed0d0]">
        <div className="flex items-center mx-8">
          <img
            src={logo}
            className="h-10 w-10 mr-1 hover:cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
            }}
            alt="logo"
          />
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className="font-extrabold text-3xl hover:cursor-pointer"
          >
            DOT
          </div>
        </div>
        <div className="mx-10 h-16 flex items-center justify-end gap-6 w-64 my-3">
          <svg
            id="dropdownButton"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10 text-[#FF6363] hover:text-[#3734ff] cursor-pointer"
            onClick={toggleDropdown}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          {isDropdownOpen && (
            <div className="absolute top-11 right-2 mt-2 w-48 bg-white shadow-md rounded-md p-2">
              <ul>
                <li
                  className="py-1 px-3 text-sm hover:bg-gray-100 hover:rounded cursor-pointer"
                  onClick={() => {
                    navigate("/settings");
                  }}
                >
                  Settings
                </li>
                <li
                  className="py-1 px-3 text-sm font-semibold text-red-600 hover:bg-red-100 hover:rounded cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/signin");
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
