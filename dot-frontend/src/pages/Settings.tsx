import { useNavigate } from "react-router-dom";
import { useSettings } from "../hooks/Settings";
import { useState } from "react";
import logo from "../assets/logo-bgr.png";

export const Settings = () => {
  const navigate = useNavigate();
  const {
    userData,
    loading,
    error,
    success,
    usernameLoading,
    updateUsername,
    updatePassword, // Add updatePassword to call the backend for password update
  } = useSettings();

  const [newUsername, setNewUsername] = useState("");
  const [usernameErrorState, setUsernameErrorState] = useState("");

  const [currentPassword, setCurrentPassword] = useState(""); // Add state for current password
  const [newPassword, setNewPassword] = useState(""); // Add state for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // Add state for confirm password
  const [passwordErrorState, setPasswordErrorState] = useState(""); // State for password errors

  const handleUpdateUsername = async () => {
    if (newUsername === "") {
      setUsernameErrorState("Username cannot be empty.");
    } else if (newUsername === userData.username) {
      setUsernameErrorState(
        "New username cannot be the same as the current username."
      );
    } else {
      await updateUsername(newUsername);
      setUsernameErrorState("");
      setNewUsername("");
    }
  };

  const handleUpdatePassword = async () => {
    // Validate the passwords
    if (newPassword !== confirmPassword) {
      setPasswordErrorState("New passwords do not match.");
    } else if (newPassword.length < 6) {
      setPasswordErrorState("Password should be at least 6 characters.");
    } else {
      await updatePassword(currentPassword, newPassword);

      setPasswordErrorState("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-[#FF6B6B] animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-[#FF6B6B] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#FF6B6B] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  } else if (error === "Error fetching data") {
    return (
      <div className="absolute top-3 right-2">
        <div
          role="alert"
          className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
        >
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
          <p className="text-xs font-semibold">
            Error - Something went wrong. Refresh the Page{" "}
          </p>
        </div>
      </div>
    );
  } else if (userData.email !== "" && userData.username !== "") {
    return (
      <div className="h-screen overflow-hidden">
        <div className="w-auto h-16 flex justify-between items-center border-b-2 border-[#fed0d0]">
          <div className="flex items-center mx-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 mr-3 hover:cursor-pointer font-bold"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>

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
        </div>
        <div className="h-[calc(100vh-16px)] w-full bg-white overflow-y-auto p-10">
          <div className="w-full max-w-2xl mx-auto shadow-xl rounded-lg border-1 border-red-50 mb-10">
            <div className="p-6">
              <h1 className="text-4xl font-semibold">Account Settings</h1>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Profile Information</h2>
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">Email:</label>
                  <p>{userData.email}</p>
                </div>
              </div>

              {/* Change Username */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Change Username</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">
                      Current Username
                    </label>
                    <input
                      type="text"
                      value={userData.username}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">
                      New Username
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Enter new username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                    {usernameErrorState && (
                      <p className="text-red-500 text-sm">
                        {usernameErrorState}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleUpdateUsername}
                    className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
                    disabled={usernameLoading}
                  >
                    {usernameLoading ? "Updating..." : "Update Username"}
                  </button>
                  {success && <p className="text-green-500">{success}</p>}
                </div>
              </div>

              {/* Change Password */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Change Password</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  {passwordErrorState && (
                    <p className="text-red-500 text-sm">{passwordErrorState}</p>
                  )}
                  <button
                    onClick={handleUpdatePassword}
                    className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Done!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
