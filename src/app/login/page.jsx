"use client";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
const SignUpForm = React.lazy(() => import("./components/SignUpForm"));
import Logo from "@/assets/logo.png";
import VerifyEmail from "./components/VerifyEmail";
import Fingerprint from "./components/Fingerprint";

export default function Page() {
  const imageUrl = Logo.src;
  const [isSigningUp, setShowSignUp] = useState(false);
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [showFingerprintComponent, setShowFingerprintComponent] =
    useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSignUpSuccess = (id, email, firstName) => {
    console.log("User signed up with id: ", id);
    setUserId(id);
    setEmail(email);
    setFirstName(firstName);
    setShowOTPComponent(true);
  };

  const handleCorrectOTPInput = () => {
    console.log("Correct OTP input. logging to fingerprint enrollment.");
    setShowFingerprintComponent(true);
  };

  return (
    <>
      <header>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </header>
      <div className="flex flex-col overflow-hidden h-screen">
        <div className="flex-grow md:flex md:flex-grow">
          <div className="hidden md:block h-full w-1/2 bg-accent">
            <Image
              width="500"
              height="500"
              src={imageUrl}
              alt="logo"
              className="object-contain w-full h-full"
            ></Image>
          </div>
          <div className="w-full md:w-1/2 overflow-auto bg-white h-full">
            {isSigningUp ? (
              <SignUpForm className="" onSignUpSuccess={handleSignUpSuccess}>
                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <button
                    className="font-semibold leading-6 text-primary hover:text-primary-hover"
                    onClick={(e) => setShowSignUp(false)}
                  >
                    Log in
                  </button>
                </p>
              </SignUpForm>
            ) : (
              <LoginForm className="">
                <p className="text-center text-sm text-gray-500">
                  Not a member?{" "}
                  <button
                    className="font-semibold leading-6 text-primary hover:text-primary-hover z-10"
                    onClick={(e) => setShowSignUp(true)}
                  >
                    Register
                  </button>
                </p>
              </LoginForm>
            )}
          </div>
        </div>
        {showOTPComponent && (
          <VerifyEmail
            userId={userId}
            email={email}
            firstName={firstName}
            openModal={showOTPComponent}
            setOpenModal={setShowOTPComponent}
            onCorrectOTPInput={handleCorrectOTPInput}
          ></VerifyEmail>
        )}
        {showFingerprintComponent && (
          <Fingerprint
            userId={userId}
            openModal={showFingerprintComponent}
            setOpenModal={setShowFingerprintComponent}
          ></Fingerprint>
        )}
      </div>
    </>
  );
}
