"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ForgotPassword from "./ForgotPassword";
import { useRouter } from "next/navigation";
import SMS from "./SMS";
import FingerprintLogin from "./FingerprintLogin";

export default function LoginForm({ className, children }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [showSMSComponent, setShowSMSComponent] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Failed to log in. Please try again."
  );
  const [showFingerprintComponent, setShowFingerprintComponent] =
    useState(false);
  const [userId, setUserId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function onCorrectSMSOTPInput() {
    setShowSMSComponent(false);
    setShowFingerprintComponent(true);
  }

  function onCorrectFingerprintInput() {
    router.push("/");
    router.refresh();
  }

  const hideAlertAfterTimeout = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const checkCredentials = async (username, password) => {
    try {
      const response = await fetch("api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status == 200) {
        const data = await response.json();
        setUserId(data);
        setShowSMSComponent(true);
      } else {
        setShowAlert(true);
        hideAlertAfterTimeout();
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAlertMessage("An error occurred while checking credentials.");
      setShowAlert(true);
      hideAlertAfterTimeout();
      return false;
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    checkCredentials(username, password);
  };

  return (
    <>
      <div
        className={`relative flex min-h-full flex-col justify-center px-6 py-3 lg:px-8 ${className}`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Sign in
          </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      onClick={(e) => setShowForgotPassword(true)}
                      className="font-semibold text-primary hover:text-primary-hover focus:outline-none cursor-pointer"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="relative w-full">
                    {showPassword ? (
                      <input
                        id="password"
                        name="password"
                        type="text"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        onCopy={(e) => e.preventDefault()}
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    ) : (
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        onCopy={(e) => e.preventDefault()}
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    )}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                      {showPassword ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          onClick={(e) => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          onClick={(e) => setShowPassword(!showPassword)}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              {showAlert && <p className="text-red-600">{alertMessage}</p>}
              <div>
                <button
                  type="submit"
                  className="flex w-full mb-3 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>

                {children}
              </div>
            </form>
          </div>
        </div>
        {showForgotPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-md">
              <ForgotPassword
                onClose={(e) => setShowForgotPassword(false)}
              ></ForgotPassword>
            </div>
          </div>
        )}
        {showSMSComponent && (
          <SMS
            onCorrectSMSOTPInput={onCorrectSMSOTPInput}
            userId={userId}
          ></SMS>
        )}
        {showFingerprintComponent && (
          <FingerprintLogin
            userId={userId}
            openModal={showFingerprintComponent}
            setOpenModal={setShowFingerprintComponent}
            onCorrectFingerprintInput={onCorrectFingerprintInput}
          ></FingerprintLogin>
        )}
      </div>
    </>
  );
}
